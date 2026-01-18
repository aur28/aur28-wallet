const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  // 👉 Use the .ico file for Windows (best compatibility)
  const iconPath = path.join(__dirname, "build", "icon.ico");
  const appIcon = nativeImage.createFromPath(iconPath);

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    title: "AUR28 Wallet",
    icon: appIcon, // taskbar + window + shortcut
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("https://explorer.aurum28.org/");


  // Hide menu bar for clean UI
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Needed on Windows for icon + notifications to work correctly
  app.setAppUserModelId("org.aur28.wallet");

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
