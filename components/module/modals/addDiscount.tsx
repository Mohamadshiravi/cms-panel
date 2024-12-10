import { FormEvent, useState } from "react";
import LoadingSvg from "../loading-svg";
import { useTypedDispatch } from "@/redux/typed-hooks";
import { addDiscountToCourses } from "@/redux/slices/course";

interface AddDiscountModalProp {
  isModalOpen: boolean;
  CloseModalHandler: () => void;
}

export default function AddDiscountModal({
  isModalOpen,
  CloseModalHandler,
}: AddDiscountModalProp) {
  const [loading, setLoading] = useState(false);
  const [discountInp, setDiscountInp] = useState("");

  const dispatch = useTypedDispatch();

  async function AddDiscountHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(addDiscountToCourses(discountInp));

    if (res.payload) {
      setLoading(false);
      swal({
        icon: "success",
        title: " تخفیف اضافه شد",
        buttons: ["اوکی", "بستن"],
      });
      CloseModalHandler();
    } else {
      setLoading(false);
      swal({
        icon: "error",
        title: " تخفیف اضافه نشد",
        buttons: ["اوکی", "بستن"],
      });
    }
  }

  return (
    <form
      onSubmit={AddDiscountHandler}
      className={`${
        isModalOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      } fade-animate md:px-28 fixed top-1 transition duration-300 left-[1%] w-[98%] bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-3 z-50`}
    >
      <h3 className="text-center text-2xl mb-8">افزودن تخفیف جدید</h3>
      <input
        value={discountInp}
        onChange={(e) => setDiscountInp(e.target.value)}
        placeholder="تخفیف"
        type="text"
        className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
      />
      <button
        disabled={loading}
        type="submit"
        className="bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-500/20 transition w-full rounded-md text-xl text-white"
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
