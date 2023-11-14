import React from "react";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function BottomTools() {
  return (
    <div className="fixed bottom-2 right-1 z-50 flex flex-col gap-1">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
}
