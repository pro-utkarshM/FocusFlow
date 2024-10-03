const { GObject, St, Clutter, Gio, GLib } = imports.gi;
const Main = imports.ui.main;
const Panel = imports.ui.panel;

var PomodoroEisenhower = GObject.registerClass(
class PomodoroEisenhower extends GObject.Object {
    _init() {
        this.actor = new St.BoxLayout({ vertical: true });
        this.timerLabel = new St.Label({ text: "Pomodoro Timer", style_class: "pomodoro-label" });
        this.actor.add_child(this.timerLabel);

        this.startButton = new St.Button({ label: "Start Pomodoro", style_class: "start-button" });
        this.startButton.connect('clicked', () => this.startPomodoro());
        this.actor.add_child(this.startButton);

        this.taskList = [];
        this.currentTaskIndex = 0;

        this._createTaskInput();

        Main.panel.addToStatusArea('pomodoro-eisenhower', this.actor);
    }

    _createTaskInput() {
        this.taskInput = new St.Entry({ hint_text: "Add a task...", style_class: "task-input" });
        this.actor.add_child(this.taskInput);

        this.addTaskButton = new St.Button({ label: "Add Task", style_class: "add-task-button" });
        this.addTaskButton.connect('clicked', () => this.addTask());
        this.actor.add_child(this.addTaskButton);

        this.taskLabel = new St.Label({ text: "Tasks:", style_class: "task-label" });
        this.actor.add_child(this.taskLabel);
    }

    addTask() {
        const task = this.taskInput.get_text();
        if (task) {
            this.taskList.push(task);
            this.taskLabel.set_text(`Tasks: ${this.taskList.join(', ')}`);
            this.taskInput.set_text('');
        }
    }

    startPomodoro() {
        if (this.currentTaskIndex < this.taskList.length) {
            this.timerLabel.set_text(`Working on: ${this.taskList[this.currentTaskIndex]}`);
            this._runTimer(25 * 60);  // 25 minutes
        } else {
            this.timerLabel.set_text("No tasks available.");
        }
    }

    _runTimer(duration) {
        this.timerLabel.set_text(`Time left: ${duration / 60} minutes`);
        this._updateTimer(duration);
    }

    _updateTimer(duration) {
        if (duration > 0) {
            this.timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 1, () => {
                duration--;
                this.timerLabel.set_text(`Time left: ${Math.floor(duration / 60)} minutes`);
                return true; // Keep the timeout active
            });
        } else {
            this._pomodoroComplete();
        }
    }

    _pomodoroComplete() {
        this.timerLabel.set_text("Pomodoro Complete! Take a break.");
        this.currentTaskIndex++;
        if (this.timeoutId) {
            GLib.Source.remove(this.timeoutId);
        }
    }
});

function init() {
    // Called when the extension is initialized
}

function enable() {
    global.pomodoroEisenhower = new PomodoroEisenhower();
}

function disable() {
    global.pomodoroEisenhower.actor.destroy();
}
