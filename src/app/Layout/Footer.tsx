import { AiFillGithub } from "react-icons/ai";
import { MdOutlineContactPage } from "react-icons/md";
import { Button } from "@nextui-org/react";

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
  return (
    <footer className="mb-[4rem] bg-background border-t border-foreground-200 p-4 lg:mb-0">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {socials.map(({ name, icon: Icon, link }) => (
            <Button
              key={link}
              as="a"
              href={link}
              target="_blank"
              startContent={<Icon size="1.5rem" />}
              variant="flat"
            >
              {name}
            </Button>
          ))}
        </div>
        <div className="text-center">
          This project was created for the vladli.dev portfolio.
        </div>
      </div>
    </footer>
  );
}
