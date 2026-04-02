import MondyNav from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MondyNav />
      {children}
    </>
  );
}
