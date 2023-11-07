import dynamic from "next/dynamic";

import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";
const DynamiFooter = dynamic(() => import("../../Layout/Footer"), {
  loading: () => <p>Loading...</p>,
});

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function layout({ children, params }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={params.locale} />
      <main className="relative grow bg-background text-foreground">
        {children}
      </main>
      <DynamiFooter />
    </div>
  );
}
