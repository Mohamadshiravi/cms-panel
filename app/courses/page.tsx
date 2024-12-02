"use client";

import Image from "next/image";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

export default function Courses() {
  return (
    <section className="bg-white dark:bg-zinc-900 w-full min-h-full sm:p-6 p-3">
      <div className="flex md:flex-row flex-col gap-4 mt-2">
        <button className="bg-green-600 hover:bg-green-700 shadow-lg dark:shadow-lg dark:shadow-green-500/20 shadow-green-500/50 transition w-full py-2 rounded-md text-xl text-white">
          افزودن دوره جدید
        </button>
        <button className="bg-red-600 hover:bg-red-700 shadow-lg dark:shadow-lg dark:shadow-red-500/20 shadow-red-500/50 transition w-full py-2 rounded-md text-xl text-white">
          افزودن تخفیف
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 shadow-lg dark:shadow-lg dark:shadow-blue-500/20 shadow-blue-500/50 transition w-full py-2 rounded-md text-xl text-white">
          افزودن دسته بندی
        </button>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {Array.from({ length: 10 }).map((e, i) => (
          <div
            key={i}
            className="flex md:flex-row flex-col items-center rounded-lg lg:h-[160px] md:h-[220px]"
          >
            <Image
              src={"/img/pxfuel.jpg"}
              width={1000}
              height={1000}
              alt="title"
              className="lg:w-[270px] md:w-[350px] w-full h-full object-cover md:rounded-r-md rounded-t-md"
            />
            <div className="flex flex-col justify-between border border-zinc-100 dark:border-zinc-800 md:rounded-l-lg rounded-b-lg w-full h-full">
              <div className="flex flex-col gap-1 md:py-2 py-4 px-3">
                <h3 className="moraba-bold text-lg">دوره متخصص ریکت</h3>
                <h4 className="text-zinc-500">
                  لورم ایپسوم مت اساسا مورد استفاده قرار گیرد.لورم ایپسوم مت
                  اساسا مورد استفاده قرار گیرد.لورم ایپسوم مت اساسا مورد استفاده
                </h4>
              </div>

              <div className="flex lg:flex-row flex-col items-center justify-between lg:gap-2 gap-4 bg-zinc-100 md:rounded-bl-md rounded-b-md dark:bg-zinc-800 px-2 py-2">
                <div className="flex flex-wrap items-center lg:justify-start justify-center w-full">
                  <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                    <FaRegMoneyBillAlt className="text-xl text-green-600" />
                    <span dir="ltr">35 000</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                    <AiOutlinePaperClip className="text-xl text-yellow-500" />
                    <span dir="ltr">فرانت اند</span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                    <PiStudentBold className="text-xl text-blue-500" />
                    <span dir="ltr">5</span>
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
      </div>
    </section>
  );
}
