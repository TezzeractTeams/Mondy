import MondyNav from "@/components/Navbar";

/** Static until redeploy; deploy when marketing copy changes. */
export const revalidate = false;

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
