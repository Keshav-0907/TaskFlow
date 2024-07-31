import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { TaskProvider } from "@/context/TaskContext";

const inter = Barlow({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Trello-Style Task Management",
  description: "Trello-Style Task Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TaskProvider>
        <html lang="en">
          <body className={inter.className}>
            <Analytics />
            <Toaster />
            {children}
          </body>
        </html>
      </TaskProvider>
    </AuthProvider>
  );
}
