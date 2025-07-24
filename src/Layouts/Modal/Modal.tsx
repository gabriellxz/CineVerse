import { Dialog } from "@/components/ui/dialog"
import  React  from "react"

interface Props {
    children: React.ReactNode
}

export default function Modal({children}:Props) {
    return (
        <Dialog>
            {children}
        </Dialog>
    )
}