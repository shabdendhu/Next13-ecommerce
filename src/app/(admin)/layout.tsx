// import "./globals.css";s
import MiniDrawer from "@/components/sections/Layout";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MiniDrawer>{children}</MiniDrawer>
    </>
  );
}
