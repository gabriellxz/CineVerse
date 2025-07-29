import { Dialog } from "@/components/ui/dialog"
import React from "react"

interface Props {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function Modal({
    children,
    onOpenChange,
    open,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog>
    )
}