"use client";

import { getUsersFromServer } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typed-hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const users = useTypedSelector((state) => {
    return state.users;
  });

  const dispatch = useTypedDispatch();
  useEffect(() => {
    FetchUser();
  }, []);
  async function FetchUser() {
    try {
      await dispatch(getUsersFromServer());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <section className="bg-white dark:bg-zinc-900 w-full min-h-full sm:p-6 p-3">
      <form className="mt-4">
        <label className="flex border-2 rounded-md items-center px-3 gap-3 transition-all border-zinc-300 dark:border-zinc-800 focus-within:border-zinc-600 text-zinc-300 dark:text-zinc-700 focus-within:text-zinc-800 dark:focus-within:text-zinc-500">
          <CiSearch className="text-3xl transition-all" />
          <input
            type="text"
            className="w-full outline-none py-3 peer bg-inherit"
            placeholder="نام یا ایمیل کاربر را وارد کنید"
          />
        </label>
      </form>
      <div className="flex flex-col gap-4 mt-8">
        {!loading &&
          users.map((e, i) => (
            <div
              key={i}
              className="flex md:flex-row flex-col gap-3 items-center justify-between p-2 rounded-lg border border-zinc-300 dark:border-zinc-800"
            >
              <div className="flex w-full gap-3 items-center">
                <Image
                  src={"/img/me.jpg"}
                  width={600}
                  height={600}
                  alt="title"
                  className="w-[60px] aspect-square object-cover rounded-md"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="moraba-bold text-base">
                    {e.firstname} {e.lastname}
                  </h3>
                  <h4 className="text-zinc-500 truncate sm:text-base text-sm">
                    {e.email}
                  </h4>
                </div>
              </div>
              <div className="flex md:justify-end justify-center gap-2 w-full">
                <button className="bg-red-500 md:w-auto w-full shadow-red-500/50 dark:shadow-lg dark:shadow-red-500/20 hover:bg-red-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white">
                  حذف
                </button>
                <button className="bg-blue-500 md:w-auto w-full shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-500/20 hover:bg-blue-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white">
                  اطلاعات
                </button>
                <button className="bg-zinc-500 md:w-auto w-full shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-500/20 hover:bg-zinc-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white">
                  پیام ها
                </button>
              </div>
            </div>
          ))}
        {loading &&
          Array.from({ length: 8 }).map((e, i) => (
            <div
              key={i}
              className="w-full p-2 border border-zinc-100 dark:border-zinc-800 rounded-lg flex gap-3 animate-pulse"
            >
              <div className="w-[60px] rounded-md aspect-square bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              <div className="flex flex-col gap-2">
                <div className="h-[25px] sm:w-[150px] w-[120px] rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                <div className="h-[25px] sm:w-[250px] w-[200px] rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
