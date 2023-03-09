/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 14:07:21
 * @LastEditTime: 2022-05-24 15:37:34
 * @LastEditors:  
 */
const { ipcMain, BrowserWindow, dialog, app, globalShortcut, desktopCapturer, screen, clipboard, nativeImage, Notification} = require("electron");
const path = require('path')
const fs = require('fs')

const openWindow = (url) => {
    let win = new BrowserWindow({
        width: 1000, height: 800, webPreferences: {
            preload: path.join(__dirname, '../../', 'preload.js')
        }
    })
    win.on('closed', () => {
        win = null
    })
    win.loadURL(url)
    win.setMenu(null)
}
ipcMain.handle('load-url', async (event, ...args) => {
    openWindow(args[0]);
    return true;
})

// 屏幕截图
ipcMain.on('screenshot', (event, args) => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    desktopCapturer.getSources({
        types: ['window'],
        thumbnailSize: {
            width: screenSize.width,
            height: screenSize.height,
        }
    }).then( sources =>{
        sources.map( (source, index) => {
            if(source.name == 'React App') {
                let rs = source.thumbnail.toDataURL()
                clipboard.writeImage(nativeImage.createFromDataURL(rs))
                return event&&event.reply&&event.reply('getScreenShot-reply', rs)
            }
        })
    })
})

// 打开目录对话框并遍历里面所有文件
ipcMain.on('readDir', (event, args) => {
    console.log('接受渲染进程参数：', args);
    dialog
    .showOpenDialog({
        properties: ['openDirectory'] // 只允许选择文件夹
    })
    .then(async rs => {
        if(!rs.canceled) {// 点击了确认按钮
            console.log('choose dir: ', rs.filePaths[0]);
            rs.filePaths = loadFilesInDir(rs.filePaths[0])
        }
        console.log('rs:', rs);
        event.reply('readDir-reply', rs)
    })
})

// 递归遍历文件
function loadFilesInDir(dir) {
    let fileList = [];
    // 读取目录下全部文件及子目录
    let files = fs.readdirSync(dir); //readdirSync 同步读取文件
    for (let i = 0; i < files.length; i++) {
        let file = path.join(dir,files[i])
        let data = fs.statSync(file); //fs.statSync()方法获取路径的详细信息
        if(data.isDirectory()){ // isDirectory() 检查是否为文件夹
            fileList = fileList.concat(loadFilesInDir(file))
        }else{
            fileList.push(file)
        }
    }
    return fileList
}

// 系统通知
function notice () {
    let notification = new Notification({
        title:"您收到新的消息",
        body: "此为消息的正文，点击查看消息",
        icon: ipath.join(__dirname, '../../logo192.png')
    });
    notification.show();
    notification.on("click", function() {
        console.log("用户点击了系统消息");
    });
}


// 注册快捷键
app.on('ready', function() {
    // 注册快捷键
    const ret = globalShortcut.register('ctrl+alt+a', () => {
        // ipcMain.emit('screenshot')
        // clipboard.writeText('ojbk')
        // clipboard.writeHTML('<div>111</div>')
        console.log('ctrl+alt+a is pressed')
    })
    if (!ret) {
        console.log('registration failed')
    }
    globalShortcut.register('ctrl+t', () => {
        // notice()
        // ipcMain.emit('screenshot')
        // clipboard.writeText('ojbk')
        // clipboard.writeHTML('<div>111</div>')
        // let imgs = clipboard.readImage()
        // console.log('ctrl+t is test',imgs.toDataURL())
    })
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('ctrl+alt+a'))
})  
app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('ctrl+alt+a')

    // 注销所有快捷键
    // globalShortcut.unregisterAll()
})