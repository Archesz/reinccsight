const { app, BrowserWindow } = require("electron")

const path = require("path")
const isDev = require("electron-is-dev")

require('@electron/remote/main').initialize()

function createWindow(){
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: __dirname + '/favicon.ico',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        show: false
    })

    const splash = new BrowserWindow({
        width: 600,
        height: 500,
        icon: __dirname + '/favicon.ico',
        frame: false,
        transparent: true, 
        alwaysOnTop: true
    })

    splash.loadURL(
        `file://${path.join(__dirname, 'splash.html')}`
    );
    splash.center();    

    setTimeout((() => {
        splash.close();

        win.loadURL(
            isDev
                ? 'http://localhost:3000'
                : `file://${path.join(__dirname, '../build/index.html')}`
        )
        
        win.maximize()
        win.show();
    }), 3000)

    //
    //win.show()


}

app.on("ready", createWindow)

app.on("window-all-closed", function(){
    if(process.platform !== "darwin"){
        app.quit()
    }
})

app.on("activate", function(){
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})