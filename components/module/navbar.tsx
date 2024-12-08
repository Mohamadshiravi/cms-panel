"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdGolfCourse, MdOutlineWebAsset } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

export default function Navbar() {
  const [gapToRight, setGapToRight] = useState("0");
  const [elementWidth, setElementWidth] = useState("0");

  const [gapToRightForElement, setGapToRightForElement] = useState("0");
  const [elementWidthForElement, setElementWidthForElement] = useState("0");
  const [isVisible, setIsVisible] = useState(false);

  const path = usePathname();

  function GapCalculatorForBorder(width: number, distanceFromRight: number) {
    setGapToRight(String(distanceFromRight));
    setElementWidth(String(width));
  }

  function GapCalculatoreForElement(width: number, distanceFromRight: number) {
    setGapToRightForElement(String(distanceFromRight));
    setElementWidthForElement(String(width));
  }

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>(".navbar-item");
    elements.forEach((element) => {
      const width = element.offsetWidth;
      const parentWidth = element.parentElement?.offsetWidth || 0;
      const distanceFromRight = parentWidth - element.offsetLeft - width;

      element.addEventListener("click", () =>
        GapCalculatorForBorder(width, distanceFromRight)
      );
      element.addEventListener("mousemove", () => {
        setIsVisible(true);
        GapCalculatoreForElement(width, distanceFromRight);
      });
      element.addEventListener("mouseleave", () => setIsVisible(false));
    });
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLDivElement>(".navbar-item");
    elements.forEach((element) => {
      const width = element.offsetWidth;
      const parentWidth = element.parentElement?.offsetWidth || 0;
      const distanceFromRight = parentWidth - element.offsetLeft - width;

      if (element.id === path) {
        setGapToRight(String(distanceFromRight));
        setElementWidth(String(width));
      }
    });
  });

  return (
    <nav
      id="navbar"
      className="bg-white dark:bg-zinc-900 w-full flex items-center border-b-2 dark:border-zinc-800 relative select-none px-1 sm:overflow-x-visible overflow-x-scroll"
    >
      <Link
        id="/"
        href={"/"}
        className="navbar-item text-zinc-700 dark:text-zinc-500 dark:hover:text-white hover:text-black transition flex items-center justify-center gap-3 py-3 md:px-8 px-3 cursor-pointer bg-white/0 z-[1]"
      >
        <FaRegUser />
        <h3>کاربران</h3>
      </Link>
      <Link
        id="/add-user"
        href={"/add-user"}
        className="navbar-item text-nowrap text-zinc-700 dark:text-zinc-500 dark:hover:text-white hover:text-black transition flex items-center justify-center gap-3 py-3 md:px-8 px-3 cursor-pointer bg-white/0 z-[1]"
      >
        <TbListDetails />
        <h3>کاربر جدید</h3>
      </Link>
      <Link
        href={"/courses"}
        id="/courses"
        className="navbar-item text-nowrap block text-zinc-700 dark:text-zinc-500 dark:hover:text-white hover:text-black transition flex items-center justify-center gap-3 py-3 md:px-8 px-3 cursor-pointer bg-white/0 z-[1]"
      >
        <MdGolfCourse />
        <h3>دوره ها</h3>
      </Link>
      <Link
        href={"/veblog"}
        id="/veblog"
        className="navbar-item text-zinc-700 dark:text-zinc-500 dark:hover:text-white hover:text-black transition flex items-center justify-center gap-3 py-3 md:px-8 px-3 cursor-pointer bg-white/0 z-[1]"
      >
        <MdOutlineWebAsset />
        <h3>وبلاگ</h3>
      </Link>
      <div
        style={{ width: `${elementWidth}px`, right: `${gapToRight}px` }}
        className={`bg-blue-500 h-[2px] rounded-t-lg absolute sm:bottom-[-2px] bottom-[-1px] transition-all duration-300`}
      ></div>
      <div
        style={{
          width: `${elementWidthForElement}px`,
          right: `${gapToRightForElement}px`,
        }}
        className={` ${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-zinc-300/50 dark:bg-zinc-700/70 h-[38px] rounded-md absolute bottom-[5px] transition-all duration-300 z-[0]`}
      ></div>
    </nav>
  );
}
