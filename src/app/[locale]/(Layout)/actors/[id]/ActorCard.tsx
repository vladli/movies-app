"use client";
import {CiImageOff} from "react-icons/ci";
import {MdOutlineCalendarMonth, MdOutlinePlace} from "react-icons/md";
import {Button, Chip, Image, useDisclosure} from "@heroui/react";
import {motion, Variants} from "framer-motion";
import {useLocale, useTranslations} from "next-intl";

import {TMDB_POSTER_780} from "@/lib/constants";
import {TActor} from "@/types/types";

import FullBiography from "./FullBiography";

const h2: Variants = {
    visible: {opacity: 1, scale: 1},
    hidden: {opacity: 0, scale: 0.5},
};
const h3: Variants = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {delay: 0.3},
    },
    hidden: {opacity: 0, x: -100},
};

type Props = {
    actor: TActor | undefined;
};

export default function ActorCard({actor}: Props) {
    const t = useTranslations();
    let locale = useLocale();
    locale = locale === "kr" ? "ko" : locale;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const birthDate = new Date(actor?.birthday as string);

    const birthDateFormat = birthDate.toLocaleString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <section className="relative">
            <div
                className="relative top-6 flex flex-col items-center justify-around gap-2 p-6 lg:flex-row-reverse lg:items-start">
                <section
                    className="relative flex min-h-[30rem] max-w-72 select-none items-center">
                    {actor?.profile_path ? (
                        <Image
                            alt="Card background"
                            className="object-cover"
                            height={400}
                            src={TMDB_POSTER_780 + actor.profile_path}
                            width={780}
                        />
                    ) : (
                        <CiImageOff size="4rem"/>
                    )}
                </section>
                <motion.section
                    animate="visible"
                    className="z-10 flex flex-col items-center gap-3 lg:items-start"
                    initial="hidden"
                >
                    <motion.h2
                        className="w-full text-center text-4xl font-bold"
                        variants={h2}
                    >
                        {actor?.name}
                    </motion.h2>
                    <div className="flex flex-wrap gap-2">
                        {actor?.birthday && (
                            <Chip
                                color="primary"
                                startContent={<MdOutlineCalendarMonth
                                    size={16}/>}
                            >
                                {birthDateFormat}
                            </Chip>
                        )}
                        {actor?.place_of_birth && (
                            <Chip
                                color="default"
                                startContent={<MdOutlinePlace size={16}/>}
                                variant="faded"
                            >
                                {actor?.place_of_birth}
                            </Chip>
                        )}
                    </div>
                    <motion.div
                        className="flex max-w-lg flex-col gap-2 font-medium "
                        variants={h3}
                    >
                        <p className="line-clamp-[10] text-foreground-600">
                            {actor?.biography || t("Actors.ErrorNoBio")}
                        </p>
                        {actor?.biography && (
                            <Button
                                className="font-medium capitalize"
                                color="secondary"
                                onPress={onOpen}
                            >
                                {t("Actors.ButtonFullBio")}
                            </Button>
                        )}
                    </motion.div>
                </motion.section>
            </div>
            <FullBiography
                {...{isOpen, onOpenChange}}
                data={actor?.biography}
            />
        </section>
    );
}
