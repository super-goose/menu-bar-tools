const { app, BrowserWindow } = require("electron");
const path = require("path");
const TrayGenerator = require("./trayGenerator");
const Store = require("electron-store");

const schema = {
  toggleStored: true,
};

const store = new Store(schema);

// https://blog.logrocket.com/building-a-menu-bar-application-with-electron-and-react/
let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.whenReady().then(() => {
  createWindow();

  const Tray = new TrayGenerator(mainWindow, store);
  Tray.createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
