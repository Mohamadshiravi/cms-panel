import type { Metadata } from "next";
import "@/style/globals.css";
import Header from "@/components/module/header";
import UserDetails from "@/components/module/user-details";
import Navbar from "@/components/module/navbar";
import ReduxProvider from "@/redux/provider/provider";

export const metadata: Metadata = {
  title: "Cms Panel",
  description: "Cmd Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="Fa">
      <body
        dir="rtl"
        className={`antialiased bg-zinc-200 dark:bg-zinc-950 xl:p-10 sm:p-6 p-3 moraba-regular select-none text-zinc-800 dark:text-white`}
      >
        <ReduxProvider>
          <Header />
          <main className=" xl:mt-10 sm:mt-6 mt-3 xl:gap-10 sm:gap-6 gap-3">
            {/* <article>
              <UserDetails />
            </article> */}
            <section className="w-full rounded-lg overflow-hidden">
              <Navbar />
              {children}
            </section>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
