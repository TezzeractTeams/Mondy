import MondyNav from "@/components/Navbar";
import { ScrollToHashOnRoute } from "@/components/ScrollToHashOnRoute";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToHashOnRoute />
      <MondyNav />
      {children}
    </>
  );
}
