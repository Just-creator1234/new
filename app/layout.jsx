// app/layout.jsx
import SessionWrapper from "@/components/SessionWrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "./globals.css";

export const metadata = {
  title: "SpeedyNews",
  description: "Fast And Reliable News",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png.png",
    apple: "/apple-touch-icon.png.png", // optional for iOS devices
    other: {
      rel: "alternate icon",
      url: "/favicon.ico", // fallback for older browsers
    },
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      {/* 👇 add this prop */}
      <body suppressHydrationWarning>
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </body>
    </html>
  );
}
