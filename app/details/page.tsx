import Image from "next/image";

export default function UserDetails() {
  return (
    <section className="sm:p-6 p-3 bg-white dark:bg-zinc-900 min-h-full">
      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-[1fr] md:grid-cols-[6fr_6fr] gap-6">
          <input
            placeholder="نام"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
          <input
            placeholder="نام خانوادگی"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[6fr_6fr] gap-6">
          <input
            placeholder="نام کاربری"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
          <input
            placeholder="ایمیل"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[4fr_4fr_4fr] gap-6">
          <input
            placeholder="رمز جاری"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
          <input
            placeholder="رمز جدید"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
          <input
            placeholder="تکرار رمز"
            type="text"
            className="block w-full border-2 border-zinc-200 dark:border-zinc-800 dark:border-b-red-800 bg-inherit rounded-sm border-b-red-600 border-b-4 px-3 py-2 text-lg outline-none"
          />
        </div>
        <div className="grid grid-cols-[1fr] relative">
          <Image
            src={"/img/pxfuel.jpg"}
            width={3000}
            height={3000}
            alt="banner"
            className="w-full h-[400px] rounded-md object-cover"
          />
          <div className="w-[290px] aspect-square rounded-lg overflow-hidden p-2 bg-zinc-800/70 absolute top-[15%] left-[50%] right-[50%] translate-x-[50%]">
            <Image
              src={"/img/me.jpg"}
              width={800}
              height={800}
              alt="prof"
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-500/20 transition w-full py-3 rounded-md text-xl text-white">
          ثبت اطلاعات
        </button>
      </form>
    </section>
  );
}
