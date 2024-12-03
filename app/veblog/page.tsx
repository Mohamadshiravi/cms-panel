"use client";

import { getVeblogsFromServer } from "@/redux/slices/veblog";
import { useTypedDispatch, useTypedSelector } from "@/redux/typed-hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";

export default function Courses() {
  const [loading, setLoading] = useState(true);
  const veblogs = useTypedSelector((state) => {
    return state.veblogs;
  });

  const dispatch = useTypedDispatch();
  useEffect(() => {
    fetchVeblogs();
  }, []);
  async function fetchVeblogs() {
    try {
      await dispatch(getVeblogsFromServer());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  return (
    <section className="bg-white dark:bg-zinc-900 w-full min-h-full sm:p-6 p-3">
      <div className="flex gap-4 mt-2">
        <button className="bg-green-600 hover:bg-green-700 dark:shadow-lg dark:shadow-green-500/20 shadow-lg shadow-green-500/50 transition w-full py-2 rounded-md text-xl text-white">
          افزودن مقاله جدید
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {!loading &&
          veblogs.map((e, i) => (
            <div
              key={i}
              className="flex md:flex-row flex-col items-center rounded-lg lg:h-[160px] md:h-[220px]"
            >
              <Image
                src={"/img/pxfuel.jpg"}
                width={1000}
                height={1000}
                alt="title"
                className="lg:w-[270px] md:w-[350px] w-full h-full object-cover md:rounded-r-md md:rounded-tl-none rounded-t-md"
              />
              <div className="flex flex-col justify-between border border-zinc-100 dark:border-zinc-800 md:rounded-l-lg md:rounded-r-none rounded-b-lg w-full h-full">
                <div className="flex flex-col gap-1 md:py-2 py-4 px-3">
                  <h3 className="moraba-bold text-lg">{e.title}</h3>
                  <h4 className="text-zinc-500">{e.desc}</h4>
                </div>

                <div className="flex lg:flex-row flex-col items-center justify-between lg:gap-2 gap-4 bg-zinc-100 rounded-bl-md md:rounded-br-none rounded-br-md dark:bg-zinc-800 px-2 py-2">
                  <div className="flex flex-wrap items-center lg:justify-start justify-center w-full">
                    <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                      <AiOutlinePaperClip className="text-xl text-yellow-500" />
                      <span dir="ltr">{e.category}</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                      <FaRegEye className="text-xl text-red-500" />
                      <span dir="ltr">{e.views}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full justify-end">
                    <button className="bg-red-500 lg:w-auto w-full shadow-red-500/50 hover:bg-red-600 dark:shadow-lg dark:shadow-red-500/20 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white">
                      حذف
                    </button>
                    <button className="bg-zinc-500 lg:w-auto w-full shadow-zinc-500/50 dark:shadow-lg dark:shadow-zinc-500/20 hover:bg-zinc-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white">
                      ویرایش
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {loading &&
          Array.from({ length: 10 }).map((e, i) => (
            <div
              key={i}
              className="flex md:flex-row flex-col border border-zinc-100 dark:border-zinc-800 rounded-md lg:h-[160px] md:h-[220px]"
            >
              <div className="lg:w-[270px] md:w-[350px] w-full md:h-full h-[200px] bg-zinc-200 animate-pulse dark:bg-zinc-800 md:rounded-r-md rounded-t-md"></div>
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col gap-2 m-3 w-full">
                  <div className="h-[25px] sm:w-[150px] w-[120px] rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                  <div className="h-[25px] sm:w-[250px] w-[200px] rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                </div>
                <div className="flex lg:justify-start justify-center w-full gap-3 p-2">
                  <div className="bg-zinc-200 w-full w-[100px] h-[40px] rounded-md animate-pulse dark:bg-zinc-800"></div>
                  <div className="bg-zinc-200 w-full w-[100px] h-[40px] rounded-md animate-pulse dark:bg-zinc-800"></div>
                  <div className="bg-zinc-200 w-full w-[100px] h-[40px] rounded-md animate-pulse dark:bg-zinc-800"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
