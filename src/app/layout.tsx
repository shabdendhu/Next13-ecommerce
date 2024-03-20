import "./globals.css";
import Providers from "@/providers";
// import { MyProvider } from "@/providers/Context";
// import store from "@/store";
// import { Provider as ReduxProvider } from "react-redux";
// import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata = {
  title: "Achara Pampad",
  description: "Indian Hand Made Achar Pampad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "sans-serif",
        }}
      >
        {/* <ReduxProvider store={store}> */}
        {/* <MyProvider> */}
        <Providers>{children}</Providers>
        {/* </MyProvider> */}
        {/* </ReduxProvider> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
