import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ฝนครับ... พี่จีบนะครับ ☁️💖",
  description: "ข้อความพิเศษส่งตรงถึงน้องฝน ด้วยความตั้งใจจีบผ่านแชท ✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Itim&family=Kanit:wght@300;400;500;600;700&family=Mali:wght@400;600;700&family=Mitr:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-['Kanit',sans-serif] bg-slate-900 text-slate-100 overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
