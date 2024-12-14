"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineSound } from "react-icons/ai";
import { GoMoon, GoSun } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";

export default function Header() {
  const [theme, setTheme] = useState("light");
  function ToggleTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "light" || theme === null) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
    ChangeThemeHandler();
  }

  function ChangeThemeHandler() {
    const theme = localStorage.getItem("theme");
    if (theme === "light" || theme === null) {
      document.documentElement.className = "";
      setTheme("light");
    } else {
      document.documentElement.className = "dark";
      setTheme("dark");
    }
  }

  useEffect(() => {
    ChangeThemeHandler();
  }, []);

  return (
    <header className="flex justify-between items-center gap-4 w-full rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-xl">
      <div className="flex w-full items-center">
        <Image
          src={"/img/me.jpg"}
          width={800}
          height={800}
          alt="prof"
          className="w-[60px] h-[60px] object-cover rounded-lg"
        />
        <div className="flex flex-col justify-center mr-4">
          <h2 className="moraba-bold sm:text-2xl text-xl">محمد شیروی</h2>
          <h3 className="text-zinc-600 sm:text-base text-sm">توسعه دهنده وب</h3>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <button
          onClick={ToggleTheme}
          className={`${
            theme === "dark"
              ? "bg-yellow-500 text-white hover:bg-yellow-600 dark:shadow-lg dark:shadow-yellow-500/20"
              : "bg-zinc-800 hover:bg-zinc-900 shadow-zinc-500/60"
          } h-[50px] w-[50px] dark:shadow-blue-500/20 flex items-center justify-center rounded-full text-white transition shadow-lg `}
        >
          {theme === "dark" ? (
            <GoSun className="text-3xl" />
          ) : (
            <GoMoon className="text-3xl" />
          )}
        </button>
      </div>
    </header>
  );
}
