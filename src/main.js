const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow() {
    const isDev = process.env.NODE_ENV === 'development';
    let win; 
    if (isDev) {
        win = new BrowserWindow({
            width: 400,
            height: 550,
            icon: path.join(__dirname, 'assets/images/favicon-32x32.png'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
    } else {
        win = new BrowserWindow({
            width: 400,
            height: 550,
            resizable: false,
            icon: path.join(__dirname, 'assets/images/favicon-32x32.png'),
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
    }
    
    win.loadFile('src/index.html');
    if (isDev) {
        win.webContents.openDevTools();
    }

    // Listen for dialog requests
    ipcMain.on('open-dialog-request', (event, arg) => {
        if (arg == "SUCCESS") {
            dialog.showMessageBox(win, {
                title: "Validation successful",
                message: "Text fields match!",
                icon: path.join(__dirname, 'assets/images/ok.png'),
                buttons: ["OK"],
            });
        } else {
            dialog.showMessageBox(win, {
                title: "Validation failed",
                message: "Text fields do not match!",
                icon: path.join(__dirname, 'assets/images/error.png'),
                buttons: ["OK"],
            });
        }
    });
}
    

// Remove the menu bar options
Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
