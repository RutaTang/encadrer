import { app, BrowserWindow, clipboard, ipcMain } from 'electron'
import path from 'path'
import { createFeedBox, AppDataSource, fetchAllFeedBox, createFeedChanal, deleteFeedBox, renameFeedBox } from 'db'
import Parser from 'rss-parser'
import axios from 'axios'

// init db config and singleton
AppDataSource.initConfig({})
AppDataSource.getInstance().initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 650,
        minWidth: 1000,
        minHeight: 650,
        titleBarStyle: "hidden",
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
    })

    win.loadURL("http://127.0.0.1:5173/")
}

app.whenReady().then(() => {
    ipcs()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// set of ipc
function ipcs() {
    ipcMain.handle("createFeedBox", async (_, { name }) => {
        return await createFeedBox({ name: name })
    })
    ipcMain.handle("fetchAllFeedBox", async () => {
        return await fetchAllFeedBox()
    })
    ipcMain.handle("createFeedChanel", async (_, {
        link,
        feedBox,
    }) => {
        return await createFeedChanal({ link, feedBox })
    })
    ipcMain.handle("deleteFeedBox", async (_, { id }) => {
        return await deleteFeedBox({ id })
    })
    ipcMain.handle("renameFeedBox", async (_, { id, name }) => {
        return await renameFeedBox({ id, name })
    })
    ipcMain.handle("rssParse", async (_, { link }) => {
        const parser = new Parser()
        const feed = await parser.parseURL(link)
        return feed
    })
    ipcMain.handle("fetchHtml", async (_, { link }) => {
        const { data } = await axios.get(link)
        return data
    })
    ipcMain.handle("writeToClipboard", async (_, { text }) => {
        clipboard.writeText(text)
    })
}
