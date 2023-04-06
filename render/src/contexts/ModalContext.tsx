import { createContext, useState } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
    showModal: (content: React.ReactNode) => void;
    hideModal: () => void;
}

const defaultContext: ModalContextType = {
    showModal: () => { },
    hideModal: () => { }
}

export const ModalContext = createContext(defaultContext);

export const ModalProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [content, setContent] = useState<React.ReactNode | null>(null)
    const showModal = (content: React.ReactNode) => {
        setContent(content)
    }
    const hideModal = () => {
        setContent(null)
    }
    return (
        < ModalContext.Provider value={{ showModal, hideModal }}>
            {
                content && createPortal((
                    <div className="z-30 fixed left-0 top-0 w-screen h-screen bg-base-300 bg-opacity-30 flex flex-row justify-center items-center" >
                        {content}
                    </div >
                ), document.body)
            }
            {children}
        </ModalContext.Provider >
    )
}
