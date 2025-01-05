import { getTranslations } from 'next-intl/server';

import { TLocales } from "@/i18n/routing";

import Container from "./Container";

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        locale
    } = params;

    const t = await getTranslations({locale, namespace: "Profile"});
    return {
        title: t("Favorites.title"),
    };
}

type Props = {
    params: Promise<{ locale: TLocales }>;
};

export default function Page() {
    return <Container/>;
}
