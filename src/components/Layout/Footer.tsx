"use client"
import {AiFillGithub} from "react-icons/ai";
import {MdOutlineContactPage} from "react-icons/md";

import {Button} from "@heroui/react";
import {useTranslations} from "next-intl";

const socials = [
    {
        name: "GitHub",
        icon: AiFillGithub,
        link: "https://github.com/vladli/movies-app",
    },
    {
        name: "vladli.dev",
        icon: MdOutlineContactPage,
        link: "https://vladli.dev/",
    },
];

export default function Footer() {
    const t = useTranslations();
    return (
        <footer
            className="border-t border-foreground-200 bg-background p-4 lg:mb-0">
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    {socials.map(({name, icon: Icon, link}) => (
                        <Button
                            key={link}
                            as="a"
                            href={link}
                            startContent={<Icon size="1.5rem"/>}
                            target="_blank"
                            variant="flat"
                        >
                            {name}
                        </Button>
                    ))}
                </div>
                <div className="text-center">
                    {t("#ROOT.Footer.description", {website: "vladli.dev"})}
                </div>
            </div>
        </footer>
    );
}
