import dynamic from "next/dynamic";

import Header from "../../../components/Layout/Header";
const DynamiFooter = dynamic(
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
      <main className="relative grow bg-background text-foreground">
        {children}
      </main>
      <DynamiFooter />
    </div>
  );
}
