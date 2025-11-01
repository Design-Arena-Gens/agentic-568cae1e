"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { PropsWithChildren, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    const root = document?.documentElement;
    if (!root) return;
    root.classList.remove("light", "dark");
    root.classList.add("theme");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
