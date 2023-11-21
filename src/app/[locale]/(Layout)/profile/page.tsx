import { useTranslations } from "next-intl";

import ProfileInfo from "./ProfileInfo";

export default function Page() {
  const t = useTranslations();
  return (
    <section className="flex flex-col items-center gap-10 p-4">
      <div className="flex flex-col place-self-center pl-2 lg:place-self-start">
        <h2 className="text-center text-4xl font-bold capitalize lg:text-start">
          {t("Profile.MyProfile.title")}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <ProfileInfo />
      </div>
    </section>
  );
}
