const { BrowserWindow, app, Tray, Menu } = require('electron');
const remote = require('@electron/remote/main');
const path = require('path');
const url = require('url');

const isDev = process.env.NODE_ENV === 'development';

remote.initialize();

function getWindowUrl(windowName = 'index') {
    if (isDev) {
        return `${process.env.ELECTRON_START_URL}/${windowName}.html`;
    }
    return url.format({
        pathname: path.join(__dirname, `/../build/${windowName}.html`),
        protocol: 'file:',
        slashes: true,
    });
}

const iconPath = path.join(__dirname, `/../${isDev ? 'public' : 'build'}/favicon.ico`);

let mainWindow;
let isQuiting;
let tray;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 960,
        height: 640,
        title: 'MegaChess',
        icon: iconPath,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: isDev,
            webSecurity: true,
            partition: 'persist:app',
            preload: path.join(__dirname, 'preload.js'),
        },
        show: false,
    });
    if (!isDev) {
        mainWindow.removeMenu();
    }
    remote.enable(mainWindow.webContents);
    mainWindow.loadURL(getWindowUrl());
    mainWindow.setMinimumSize(360, 480);
    mainWindow.on('ready-to-show', () => mainWindow.show());
    mainWindow.on('close', (event) => {
        if (!isQuiting) {
            event.preventDefault();
            mainWindow.hide();
            event.returnValue = false;
        }
    });
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    } else {
        mainWindow.show();
    }
});

app.on('before-quit', function () {
    isQuiting = true;
});

app.disableHardwareAcceleration();
app.on('ready', () => {
    if (process.platform === 'win32') {
        app.setAppUserModelId('MegaChess');
    }
    createWindow();
    tray = new Tray(iconPath);
    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: 'Mở MegaChess',
                click: () => {
                    mainWindow.show();
                },
            },
            {
                label: 'Thoát',
                click: () => {
                    isQuiting = true;
                    app.quit();
                },
            },
        ])
    );
    tray.setToolTip('MegaChess');
});
