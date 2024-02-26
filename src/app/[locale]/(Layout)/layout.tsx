import dynamic from "next/dynamic";

import Header from "../../../components/Layout/Header";
const DynamicFooter = dynamic(
  () => import("../../../components/Layout/Footer"),
  {
    loading: () => <p>Loading...</p>,
  }
);

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-col grow bg-background text-foreground">
        {children}
      </main>
      <DynamicFooter />
    </div>
  );
}
