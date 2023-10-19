import React from "react";
import Header from "../Layout/Header";
import Image from "next/image";
import Footer from "../Layout/Footer";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="absolute bottom-20 right-5 z-10 h-[10rem] w-[10rem] opacity-20">
        <Image
          alt=""
          fill
          src="/bg.png"
        />
      </div>
      <main className="grow bg-background p-4 text-foreground">{children}</main>
      <Footer />
    </div>
  );
}
