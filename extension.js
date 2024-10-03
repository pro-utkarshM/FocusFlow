const { GObject, St, Clutter } = imports.gi;
const Main = imports.ui.main;

var PomodoroEisenhower = GObject.registerClass(
class PomodoroEisenhower extends GObject.Object {
    _init() {
        this.actor = new St.BoxLayout({ vertical: true });
        this._createUI();
        Main.panel.addToStatusArea('pomodoro-eisenhower', this.actor);
    }

    _createUI() {
        // Create UI elements for your extension (e.g., buttons, labels)
        const label = new St.Label({ text: "Pomodoro Timer", style_class: "pomodoro-label" });
        this.actor.add_child(label);
        
        // More UI components like buttons and task lists can be added here
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
