import { FeedBox } from 'db/dist/entity/Feed';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    createFeedBox: ({ name }: { name: string }) => ipcRenderer.invoke('createFeedBox', { name }),
    createFeedChanel: ({ link, feedBox }: { link: string, feedBox: FeedBox }) => ipcRenderer.invoke('createFeedChanel', { link, feedBox }),
    deleteFeedBox: ({ id }: { id: number }) => ipcRenderer.invoke('deleteFeedBox', { id }),
    renameFeedBox: ({ id, name }: { id: number, name: string }) => ipcRenderer.invoke('renameFeedBox', { id, name }),
    fetchAllFeedBox: () => ipcRenderer.invoke('fetchAllFeedBox'),
    rssParse: ({ link }: { link: string }) => ipcRenderer.invoke('rssParse', { link }),
    fetchHtml: ({ link }: { link: string }) => ipcRenderer.invoke('fetchHtml', { link }),

    writeToClipboard: ({ text }: { text: string }) => ipcRenderer.invoke('writeToClipboard', { text }),
});
