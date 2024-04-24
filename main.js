const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const path = require("path");

const newArgvPos = process.argv.indexOf("--");

if (newArgvPos < 0) {
  console.log("double dash is required");
  app.exit();
}

const newArgv = process.argv.slice(newArgvPos + 1);

if (!newArgv[0]) {
  console.log("html path is required");
  app.exit();
}

const htmlPath = path.resolve(newArgv[0]);

if (newArgv[1]) {
  process.env["OUTPUT_PATH"] = path.resolve(newArgv[1]);
}

ipcMain.on("done", () => {
  app.quit();
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.webContents.on('console-message', (event, level, message) => {
    console.log(`[${level}] ${message}`);

    if (level === 3) {
      app.exit();
    }
  });
  mainWindow.loadFile(htmlPath);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  createWindow();
});