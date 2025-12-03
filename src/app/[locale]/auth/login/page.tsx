import {Card, CardBody, CardHeader} from "@heroui/react";
import {getServerSession} from "next-auth";
import {getTranslations} from "next-intl/server";
import {redirect} from "next/navigation";

import Logo from "@/components/Logo";
import {authOptions} from "@/lib/authOptions";

import LoginForm from "./LoginForm";

export default async function login() {
    const t = await getTranslations("Auth");
    const session = await getServerSession(authOptions);
    if (session) redirect("/");

    return (
        <section className="flex h-[100dvh] flex-col items-center">
            <Logo className="relative top-5"/>
            <div className="flex h-full items-center justify-center">
                <Card className="w-[85dvw] sm:w-[30rem]">
                    <CardBody className="flex flex-col gap-4">
                        <CardHeader
                            className="flex justify-center text-xl font-medium">
                            {t("title")}
                        </CardHeader>
                        <LoginForm/>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}
