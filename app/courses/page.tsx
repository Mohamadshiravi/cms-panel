"use client";

import CourseModals from "@/components/module/course-modals";
import LoadingSvg from "@/components/module/loading-svg";
import {
  deleteCoursesFromServer,
  getCoursesFromServer,
} from "@/redux/slices/course";
import { useTypedDispatch, useTypedSelector } from "@/redux/typed-hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import swal from "sweetalert";

export default function Courses() {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [courseModal, setCourseModal] = useState<string | boolean>(false);
  const courses = useTypedSelector((state) => {
    return state.courses;
  });

  const dispatch = useTypedDispatch();
  useEffect(() => {
    FetchCourses();
  }, []);
  async function FetchCourses() {
    try {
      await dispatch(getCoursesFromServer());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  function CloseModalHandler() {
    setCourseModal(false);
  }

  async function DeleteCourseHandler(id: string) {
    const isOk = await swal({
      icon: "warning",
      title: "ایا از حذف مطمعن هستید ؟؟؟",
      buttons: ["خیر", "بله"],
    });
    if (isOk) {
      setBtnLoading(true);
      const res = await dispatch(deleteCoursesFromServer(id));
      if (res.payload) {
        setBtnLoading(false);
        swal({
          icon: "success",
          title: "دوره حذف شد",
          buttons: ["باشه", "اوکی"],
        });
      } else {
        setBtnLoading(false);
      }
    }
  }

  return (
    <>
      <section className="bg-white dark:bg-zinc-900 w-full min-h-full sm:p-6 p-3">
        <div className="flex md:flex-row flex-col gap-4 mt-2">
          <button
            onClick={() => {
              setCourseModal("course");
            }}
            className="bg-green-600 hover:bg-green-700 shadow-lg dark:shadow-lg dark:shadow-green-500/20 shadow-green-500/50 transition w-full py-2 rounded-md text-xl text-white"
          >
            افزودن دوره جدید
          </button>
          <button
            onClick={() => {
              setCourseModal("discount");
            }}
            className="bg-red-600 hover:bg-red-700 shadow-lg dark:shadow-lg dark:shadow-red-500/20 shadow-red-500/50 transition w-full py-2 rounded-md text-xl text-white"
          >
            افزودن تخفیف
          </button>
          <button
            onClick={() => {
              setCourseModal("categori");
            }}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg dark:shadow-lg dark:shadow-blue-500/20 shadow-blue-500/50 transition w-full py-2 rounded-md text-xl text-white"
          >
            افزودن دسته بندی
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {!loading &&
            courses.map((e, i) => (
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
                        <FaRegMoneyBillAlt className="text-xl text-green-600" />
                        {e.discount === 0 ? (
                          <span dir="ltr">
                            {e.price.toLocaleString("Fa-ir")}
                          </span>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span dir="ltr">
                              {(
                                e.price *
                                (1 - e.discount / 100)
                              ).toLocaleString("Fa-ir")}
                            </span>
                            <span
                              dir="ltr"
                              className="text-xs line-through text-red-600"
                            >
                              {e.price.toLocaleString("Fa-ir")}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                        <AiOutlinePaperClip className="text-xl text-yellow-500" />
                        <span dir="ltr">{e.categori.name}</span>
                      </div>
                      <div className="flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 px-3">
                        <PiStudentBold className="text-xl text-blue-500" />
                        <span dir="ltr">{e.registersCount}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full justify-end">
                      <button
                        onClick={() => DeleteCourseHandler(e._id)}
                        disabled={btnLoading}
                        className="bg-red-500 text-center overflow-hidden md:w-auto w-full shadow-red-500/50 dark:shadow-lg dark:shadow-red-500/20 hover:bg-red-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white"
                      >
                        {btnLoading ? <LoadingSvg width={30} /> : "حذف"}
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
      {courseModal && (
        <CourseModals modal={courseModal} CloseModal={CloseModalHandler} />
      )}
    </>
  );
}
