const { Tray, Menu } = require("electron");
const path = require("path");
const helper = require("./helperCommands");

class TrayGenerator {
  constructor(mainWindow, store) {
    this.tray = null;
    this.mainWindow = mainWindow;
    this.store = store;
  }
  getWindowPosition = () => {
    const windowBounds = this.mainWindow.getBounds();
    const trayBounds = this.tray.getBounds();
    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    const y = Math.round(trayBounds.y + trayBounds.height);
    return { x, y };
  };

  getMenu = () => {
    const menu = [
      {
        label: "Log in G1Client Mobile",
        click: (event) => {
          helper.loginClient();
        },
      },
      {
        label: "Log in Kingpin",
        click: (event) => {
          helper.loginKingpin();
        },
      },
      {
        label: "Log in Ironfist",
        click: (event) => {
          helper.loginIronfist();
        },
      },
      {
        label: "Toggle",
        type: "checkbox",
        checked: this.store.get("toggleStored"),
        click: (event) => this.store.set("toggleStored", event.checked),
      },
      {
        label: 'Quit "Tools"',
        role: "quit",
        accelerator: "Command+Q",
      },
    ];
    return menu;
  };

  showWindow = () => {
    const position = this.getWindowPosition();
    this.mainWindow.setPosition(position.x, position.y, false);
    this.mainWindow.show();
    this.mainWindow.setVisibleOnAllWorkspaces(true);
    this.mainWindow.focus();
    this.mainWindow.setVisibleOnAllWorkspaces(false);
  };

  showMenu = () => {
    if (
      this.mainWindow &&
      this.mainWindow.isVisible &&
      this.mainWindow.isVisible()
    ) {
      this.mainWindow.hide();
      // this.showWindow();
    }
    this.tray.popUpContextMenu(Menu.buildFromTemplate(this.getMenu()));
  };

  createTray = () => {
    this.tray = new Tray(path.join(__dirname, "./assets/IconTemplate.png"));
    this.tray.setIgnoreDoubleClickEvents(true);

    this.tray.on("click", this.showMenu);
    this.tray.on("right-click", this.showMenu);
  };
}

module.exports = TrayGenerator;
