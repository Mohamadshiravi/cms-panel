import Image from "next/image";
import Link from "next/link";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TbLetterCaseLower, TbLetterCaseUpper } from "react-icons/tb";

export default function UserDetails() {
  return (
    <section className="rounded-lg overflow-hidden grid xl:grid-cols-[1fr] md:grid-cols-[8fr_4fr] bg-white dark:bg-zinc-900 shadow-xl sticky top-10">
      <div className="relative w-full">
        <Image
          src={"/img/pxfuel.jpg"}
          width={2000}
          height={2000}
          alt="proof banner"
          className="w-full h-full object-cover"
        />
        <div className="xl:w-[180px] sm:w-[250px] w-[180px] aspect-square rounded-lg overflow-hidden p-2 bg-zinc-800/70 absolute xl:top-[50%] top-[20%] left-[50%] right-[50%] translate-x-[50%]">
          <Image
            src={"/img/me.jpg"}
            width={800}
            height={800}
            alt="prof"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-4 xl:mt-24 md:mt-0 mt-16 w-full">
        <div className="flex flex-col gap-1">
          <h2 className="moraba-bold text-2xl w-full text-center">
            محمد شیروی
          </h2>
          <h3 className="text-zinc-600 w-full text-center">توسعه دهنده وب</h3>
        </div>
        <ul className="w-full xl:px-8 px-4 mt-6">
          <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
            <span className="flex items-center gap-3">
              <TbLetterCaseLower className="text-xl text-zinc-400 dark:text-zinc-600" />
              نام کوچک
            </span>
            <span className="text-blue-500"> محمد</span>
          </li>
          <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
            <span className="flex items-center gap-3">
              <TbLetterCaseUpper className="text-xl text-zinc-400 dark:text-zinc-600" />
              نام خانوادگی
            </span>
            <span className="text-yellow-500">شیروی</span>
          </li>
          <li className="w-full flex items-center justify-between text-lg border-t border-zinc-200 dark:border-zinc-800 py-2">
            <span className="flex items-center gap-3">
              <MdOutlineAccountBalanceWallet className="text-xl text-zinc-400 dark:text-zinc-600" />
              تعداد دوره ها
            </span>
            <span className="text-red-500">30</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
