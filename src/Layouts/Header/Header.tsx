import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { CiSearch } from "react-icons/ci";

export default function Header() {

    const navigate = useNavigate()

    return (
        <header className="flex items-center justify-between p-5 w-full fixed z-20 md:bg-white/10 md:backdrop-blur-md gap-5">
            <div className="flex items-center gap-2">
                <h1 className="text-white text-3xl font-bold ">CineVerse</h1>
            </div>
            <div>
                <Button onClick={() => navigate("/search")} className="text-white">
                    <CiSearch />
                </Button>
            </div>
        </header>
    )
}