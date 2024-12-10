import { FormEvent, useState } from "react";
import LoadingSvg from "../loading-svg";
import { useTypedDispatch, useTypedSelector } from "@/redux/typed-hooks";
import { addCategoriToServer } from "@/redux/slices/categori";
import swal from "sweetalert";

interface AddCategoriModalProp {
  isModalOpen: boolean;
  CloseModalHandler: () => void;
}

export default function AddCategoriModal({
  isModalOpen,
  CloseModalHandler,
}: AddCategoriModalProp) {
  const [loading, setLoading] = useState(false);
  const [categoriInp, setCategoriInp] = useState("");

  const dispatch = useTypedDispatch();

  async function AddCategoriHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(addCategoriToServer({ name: categoriInp }));

    if (res.payload) {
      setLoading(false);
      swal({
        icon: "success",
        title: "دسته بندی اضافه شد",
        buttons: ["اوکی", "بستن"],
      });
      CloseModalHandler();
    } else {
      setLoading(false);
      swal({
        icon: "error",
        title: "دسته بندی اضافه نشد",
        buttons: ["اوکی", "بستن"],
      });
    }
  }

  return (
    <form
      onSubmit={AddCategoriHandler}
      className={`${
        isModalOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      } fade-animate md:px-28 fixed top-1 transition duration-300 left-[1%] w-[98%] bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-3 z-50`}
    >
      <h3 className="text-center text-2xl mb-8">افزودن دسته بندی جدید</h3>
      <input
        onChange={(e) => setCategoriInp(e.target.value)}
        value={categoriInp}
        placeholder="دسته بندی"
        type="text"
        className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
      />
      <button
        disabled={loading}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-500/20 transition w-full rounded-md text-xl text-white"
      >
        {loading ? (
          <LoadingSvg width={50} />
        ) : (
          <span className="my-3">افزودن</span>
        )}
      </button>
    </form>
  );
}
