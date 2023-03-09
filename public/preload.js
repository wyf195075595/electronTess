/*
 * @Description: 
 * @Author:  
 * @Date: 2022-05-10 14:07:21
 * @LastEditTime: 2022-06-16 10:22:59
 * @LastEditors:  
 */
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path')
const { createWorker } = require('tesseract.js')
// 都将 ipcRender 暴露到渲染进程了，为啥还要在这里写 api?
// 出于安全考虑 window.electron.ipcRender(invoke、postMessage、send、sendSync、sendToHost) 没有 send 和 once 方法。
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer
})

// invoke 和 handle 的方法跟 send与on/once 基本一致。最大区别就是不用通过 preloadjs定义监听事件
contextBridge.exposeInMainWorld('api', {
    getAppConfig: (key) => {
        const configPath = path.resolve('config.json');
        const config = require('nconf').file(configPath);
        return config.get(key);
    },
    openWindow: (url) => ipcRenderer.invoke("load-url", url),
    readFileDir: (cb) => {
        ipcRenderer.send("readDir")
        ipcRenderer.once('readDir-reply', (event, rs) => {
            cb(event, rs)
        })
    },
    screenShot: (cb)=> {
        ipcRenderer.send('screenshot')
        ipcRenderer.once('getScreenShot-reply', (event, rs) => {
            cb(event, rs)
        })
    },
    getTsPath() {
        return {
            workerPath: path.join(__dirname, '../node_modules/tesseract.js/dist/tesseract.min.js'),
            langPath: path.join(__dirname, 'lang/'),// ./lang-data
            corePath: path.join(__dirname, '../node_modules/tesseract.js-core/tesseract-core.wasm.js'),
        }
    },
    getWorker(options) {
        const worker = createWorker({
            langPath: path.join(__dirname, 'langs'), 
            logger: m => console.log(m),
            ...options,
        });
        return worker
    },
    pathJoin(...args) {
        return path.join(...args)
    }
})