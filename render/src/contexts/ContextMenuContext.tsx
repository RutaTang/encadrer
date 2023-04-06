import { createContext, useState } from "react"

interface ContextItem {
    label: string,
    onClick: () => void
}

const ContextMenu = ({ items, position }: {
    items: ContextItem[],
    position: { x: number, y: number }
}) => {
    return (
        <div
            className="absolute bg-white text-black rounded-md shadow-md shadow-gray-200 z-50 bg-opacity-[0.95] text-sm px-3 py-1 min-w-[100px]"
            style={{ top: position.y, left: position.x }}
        >
            {items.map((item, index) => (
                <div key={index}>
                    <button
                        className="w-full text-left py-1 focus:outline-none"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </button>
                </div>
            ))}
        </div>
    );
};

interface ContextMenuContextType {
    showMenu: ({ items, position }: {
        items: ContextItem[],
        position: { x: number, y: number }
    }) => void
}

const defaultContext: ContextMenuContextType = {
    showMenu: () => { }
}

export const ContextMenuContext = createContext<ContextMenuContextType>(defaultContext)

export const ContextMenuProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [menuItems, setMenuItems] = useState<any>(null)
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const showMenu = ({ items, position }: {
        items: ContextItem[],
        position: { x: number, y: number }
    }) => {
        setPosition(position)
        setMenuItems(items)
    }
    return (
        <ContextMenuContext.Provider value={{ showMenu }}>
            <div onClick={(e) => {
                if (menuItems === null) return
                e.stopPropagation()
                setMenuItems(null)
            }}>
                {menuItems && <ContextMenu items={menuItems} position={position} />}
                {children}
            </div>
        </ContextMenuContext.Provider>
    )
}
