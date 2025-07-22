import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CiSearch } from "react-icons/ci";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-5 w-full fixed z-10 bg-white/10 backdrop-blur-md">
            <h1 className="text-white text-3xl font-bold ">CineVerse</h1>
            <div className="flex items-center gap-2">
                <Input type="text" placeholder="Buscar por..." className="w-full max-w-[500px]" />
                <Button className="text-white">
                    <CiSearch />
                </Button>
            </div>
        </header>
    )
}