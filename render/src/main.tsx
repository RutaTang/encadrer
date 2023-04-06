import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextMenuProvider } from './contexts/ContextMenuContext'
import { ModalProvider } from './contexts/ModalContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ContextMenuProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </ContextMenuProvider >
    </React.StrictMode>,
)
