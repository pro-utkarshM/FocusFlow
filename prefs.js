const { GObject, Gtk } = imports.gi;

var PomodoroEisenhowerPrefs = GObject.registerClass(
    class PomodoroEisenhowerPrefs extends GObject.Object {
        _init() {
            // Create the preferences dialog
            this.dialog = new Gtk.Dialog({ title: "Preferences" });
            this.dialog.set_default_size(400, 200);

            // Create a box to hold UI elements
            let vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 10 });
            vbox.set_margin_start(10);
            vbox.set_margin_end(10);
            vbox.set_margin_top(10);
            vbox.set_margin_bottom(10);

            // Add a label for the preferences window
            let label = new Gtk.Label({ label: "Pomodoro Eisenhower Settings" });
            vbox.append(label);

            // Example: Add a toggle button for notifications
            let notificationToggle = new Gtk.CheckButton({ label: "Enable notifications" });
            vbox.append(notificationToggle);

            // Add a close button
            let closeButton = new Gtk.Button({ label: "Close" });
            closeButton.connect("clicked", () => {
                this.dialog.close();
            });
            vbox.append(closeButton);

            // Add the box to the dialog
            this.dialog.get_content_area().append(vbox);
            this.dialog.show_all();
        }

        // Show the preferences window
        show() {
            this.dialog.show();
        }
    }
);

// Export the function that shows preferences
function buildPrefsWidget() {
    let prefs = new PomodoroEisenhowerPrefs();
    prefs.show();
}
