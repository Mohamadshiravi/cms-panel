"use client";

import { userStateType } from "@/redux/slices/user";
import Image from "next/image";
import { useState } from "react";

export default function UserModal({
  CloseModal,
  user,
}: {
  CloseModal: () => void;
  user: userStateType | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function CloseModalHandler() {
    setIsModalOpen(false);
    setTimeout(() => {
      CloseModal();
    }, 300);
  }

  return (
    <>
      <section
        id="modal"
        onClick={CloseModalHandler}
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } transition duration-300  w-full h-screen fixed top-0 left-0 bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-sm z-40 `}
      ></section>
      <div
        className={`${
          isModalOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-[10rem] opacity-0"
        } fade-animate md:px-28 fixed top-1 transition duration-300 left-[1%] w-[98%] bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-3 z-50`}
      >
        <div className="flex md:flex-row flex-col items-center gap-6">
          <Image
            src={"/img/me.jpg"}
            width={1000}
            height={1000}
            alt="title"
            className="w-[150px] aspect-square object-cover rounded-md"
          />
          <ul className="w-full xl:px-8 px-4 mt-6">
            <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
              <span className="flex items-center gap-3">نام کوچک</span>
              <span className="text-blue-500">{user?.firstname}</span>
            </li>
            <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
              <span className="flex items-center gap-3">نام خانوادگی</span>
              <span className="text-red-500">{user?.lastname}</span>
            </li>
            <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
              <span className="flex items-center gap-3">نام کاربری</span>
              <span className="text-zinc-500">{user?.username}</span>
            </li>
            <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
              <span className="flex items-center gap-3">ایمیل</span>
              <span className="text-zinc-500 truncate" dir="ltr">
                {user?.email}
              </span>
            </li>
            <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
              <span className="flex items-center gap-3">سن</span>
              <span className="text-zinc-500">{user?.age}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
