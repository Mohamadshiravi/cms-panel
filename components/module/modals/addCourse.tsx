import { FormEvent, useState } from "react";
import LoadingSvg from "../loading-svg";
import { useTypedDispatch, useTypedSelector } from "@/redux/typed-hooks";
import { addCoursesToServer } from "@/redux/slices/course";
import swal from "sweetalert";

interface AddCourseModalProp {
  isModalOpen: boolean;
  CloseModalHandler: () => void;
}

export default function AddCourseModal({
  isModalOpen,
  CloseModalHandler,
}: AddCourseModalProp) {
  const [titleInp, setTitleInp] = useState("");
  const [descInp, setDescInp] = useState("");
  const [PriceInp, setPriceInp] = useState("");
  const [courseCategotiInp, setCourseCategoriInp] = useState("");

  const [categories, setCategories] = useState([
    "فرانت اند",
    "بک اند",
    "امنیت",
    "فرعی",
    "مهارت های نرم",
  ]);

  const [loading, setLoading] = useState(false);

  async function AddCourseHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (courseCategotiInp === "") {
      setLoading(false);
      return swal({
        icon: "error",
        title: "دسته بندی را انتخاب کنید",
        buttons: ["اوکی", "بستن"],
      });
    }

    const course = {
      title: titleInp,
      desc: descInp,
      price: +PriceInp,
      categori: courseCategotiInp,
    };

    const res = await dispatch(addCoursesToServer(course));

    if (res.payload) {
      setLoading(false);
      swal({
        icon: "success",
        title: "دوره جدید اضافه شد",
        buttons: ["اوکی", "بستن"],
      });
      CloseModalHandler();
    } else {
      setLoading(false);
      swal({
        icon: "error",
        title: "دوره جدید اضافه نشد",
        buttons: ["اوکی", "بستن"],
      });
    }
  }

  const dispatch = useTypedDispatch();

  return (
    <form
      className={`${
        isModalOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-[10rem] opacity-0"
      } fade-animate md:px-28 fixed top-1 transition duration-300 left-[1%] w-[98%] bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-3 z-50`}
    >
      <h3 className="text-center text-2xl mb-8">افزودن دوره جدید</h3>
      <input
        value={titleInp}
        onChange={(e) => setTitleInp(e.target.value)}
        placeholder="نام دوره"
        type="text"
        className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
      />
      <input
        value={descInp}
        onChange={(e) => setDescInp(e.target.value)}
        placeholder="درباره دوره"
        type="text"
        className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
      />
      <input
        value={PriceInp}
        onChange={(e) => setPriceInp(e.target.value)}
        placeholder="قیمت دوره"
        type="number"
        className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
      />
      <select
        onChange={(e) => setCourseCategoriInp(e.target.value)}
        value={courseCategotiInp}
        className="dark:bg-zinc-800 rounded-sm py-3 px-2 outline-none"
      >
        <option value={""} defaultChecked disabled>
          دسته بندی دوره
        </option>
        {categories.map((e, i) => (
          <option key={i} value={e}>
            {e}
          </option>
        ))}
      </select>
      <button
        onClick={AddCourseHandler}
        disabled={loading}
        type="submit"
        className="bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-500/20 transition w-full rounded-md text-xl text-white"
      >
        {loading ? (
          <LoadingSvg width={60} />
        ) : (
          <span className="my-4">افزودن</span>
        )}
      </button>
    </form>
  );
}
