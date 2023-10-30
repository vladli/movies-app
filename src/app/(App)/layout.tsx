import dynamic from "next/dynamic";

import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
const DynamiFooter = dynamic(() => import("../Layout/Footer"), {
  loading: () => <p>Loading...</p>,
});
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative grow bg-background text-foreground ">
        {children}
      </main>
      <DynamiFooter />
    </div>
  );
}
