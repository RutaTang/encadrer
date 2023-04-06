// For brokenable img

import { Cat } from "lucide-react"
import { useState } from "react"

const Img = ({ src }: {
    src: string
}) => {
    const [imgBroken, setImgBroken] = useState(false)
    return (
        !imgBroken ? <img src={src} alt="Profile" onError={() => { setImgBroken(true) }} /> : <Cat />
    )
}

export default Img
