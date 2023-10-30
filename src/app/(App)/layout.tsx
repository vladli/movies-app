import React from "react";

import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative grow bg-background text-foreground ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
