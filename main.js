const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 360,
    minHeight: 500,
    title: "Tugas Penundaan Imbalan",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (process.platform !== "darwin") Menu.setApplicationMenu(null);

  win.loadFile(path.join(__dirname, "src", "index.html"));

  // Link eksternal (referensi/DOI) dibuka di browser, bukan di dalam app
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("file://")) {
      e.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });

  // F11 = fullscreen, Ctrl+Shift+I = devtools (buat debug)
  win.webContents.on("before-input-event", (e, input) => {
    if (input.type !== "keyDown") return;
    if (input.key === "F11") win.setFullScreen(!win.isFullScreen());
    if (input.control && input.shift && input.key.toLowerCase() === "i")
      win.webContents.toggleDevTools();
  });
}

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
