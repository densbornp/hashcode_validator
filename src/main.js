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
    
    win.loadFile(path.join(__dirname, '/index.html'));
    if (isDev) {
        win.webContents.openDevTools();
    }

    // Listen for dialog requests
    ipcMain.on('open-dialog-request', (event, arg) => {
        if (arg == "SUCCESS") {
            dialog.showMessageBox(win, {
                title: "Validation successful",
                message: "Hash values do match!",
                icon: path.join(__dirname, 'assets/images/ok.png'),
                buttons: ["OK"],
            });
        } else {
            dialog.showMessageBox(win, {
                title: "Validation failed",
                message: "Hash values do not match!",
                icon: path.join(__dirname, 'assets/images/error.png'),
                buttons: ["OK"],
            });
        }
    });
}

// Create the Application's main menu
let template = [{
    label: "Application",
    submenu: [
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];
    

// Remove the menu bar options
Menu.setApplicationMenu(Menu.buildFromTemplate(template));

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
