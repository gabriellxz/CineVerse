import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { CiSearch } from "react-icons/ci";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import type { SetStateAction } from "react";
import type React from "react";

interface Props {
    selectedLanguage: string | null;
    setSelectedLanguage: React.Dispatch<SetStateAction<string | null>>;
}

export default function Header({ setSelectedLanguage, selectedLanguage }: Props) {

    function handleLanguageChange(value: string) {
        if (value) {
            setSelectedLanguage(value)
            localStorage.setItem("@cn_language", value)
        }
        // console.log("Selected language:", value)
    }

    return (
        <header className="flex items-center justify-between p-5 w-full fixed z-10 bg-white/10 backdrop-blur-md gap-5">
            <div className="flex items-center gap-2">
                <h1 className="text-white text-3xl font-bold ">CineVerse</h1>
                <div>
                    <Select onValueChange={handleLanguageChange} value={selectedLanguage ?? undefined}>
                        <SelectTrigger className="max-w-[100px] w-full text-white">
                            <SelectValue placeholder={selectedLanguage == "en" ? "Language" : "Idioma"} />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 text-white rounded-md">
                            <SelectGroup>
                                <SelectItem value="en" className="text-xl">
                                    en
                                </SelectItem>
                                <SelectItem value="pt-BR" className="text-xl">
                                    pt-BR
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Input type="text" placeholder="Buscar por..." className="w-full max-w-[500px] text-white" />
                <Button className="text-white">
                    <CiSearch />
                </Button>
            </div>
        </header>
    )
}