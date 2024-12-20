"use client";

import LoadingSvg from "@/components/module/loading-svg";
import UserModal from "@/components/module/user-modal";
import { deleteUsersFromServer, getUsersFromServer } from "@/redux/slices/user";
import { useTypedDispatch, useTypedSelector } from "@/redux/typed-hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import swal from "sweetalert";
import { userStateType } from "@/redux/slices/user";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [users, setUsers] = useState<userStateType[]>([]);

  const [searchInp, setSearchInp] = useState("");

  const [userModalDetails, setUserModalDetails] =
    useState<null | userStateType>(null);
  const usersState = useTypedSelector((state: { users: userStateType[] }) => {
    return state.users;
  });

  const dispatch = useTypedDispatch();
  useEffect(() => {
    FetchUser();
  }, []);
  async function FetchUser() {
    try {
      const res = await dispatch(getUsersFromServer());
      setUsers(res.payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function DeleteUserHandler(id: string) {
    const isOk = await swal({
      icon: "warning",
      title: "ایا از حذف مطمعن هستید ؟؟؟",
      buttons: ["خیر", "بله"],
    });
    if (isOk) {
      try {
        setBtnLoading(true);
        await dispatch(deleteUsersFromServer(id));
        setBtnLoading(false);
      } catch (error) {
        setBtnLoading(false);
      }
    }
  }

  useEffect(() => {
    const filteredUsers = usersState.filter((e: userStateType) => {
      return e.firstname.includes(searchInp) || e.email.includes(searchInp);
    });

    setUsers(filteredUsers);
  }, [searchInp]);
  return (
    <>
      <section className="bg-white dark:bg-zinc-900 w-full min-h-full sm:p-6 p-3">
        <form className="mt-4">
          <label className="flex border-2 rounded-md items-center px-3 gap-3 transition-all border-zinc-300 dark:border-zinc-800 focus-within:border-zinc-600 text-zinc-300 dark:text-zinc-700 focus-within:text-zinc-800 dark:focus-within:text-zinc-500">
            <CiSearch className="text-3xl transition-all" />
            <input
              value={searchInp}
              onChange={(e) => setSearchInp(e.target.value)}
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
                  <button
                    onClick={() => DeleteUserHandler(e._id)}
                    disabled={btnLoading}
                    className="bg-red-500 text-center overflow-hidden md:w-auto w-full shadow-red-500/50 dark:shadow-lg dark:shadow-red-500/20 hover:bg-red-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white"
                  >
                    {btnLoading ? <LoadingSvg width={30} /> : "حذف"}
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setUserModalDetails(e);
                    }}
                    className="bg-blue-500 md:w-auto w-full shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-500/20 hover:bg-blue-600 hover:shadow-none hover:translate-y-1 transition shadow-lg px-4 rounded-md py-2 text-white"
                  >
                    اطلاعات
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
      {isModalOpen && (
        <UserModal CloseModal={CloseModalHandler} user={userModalDetails} />
      )}
    </>
  );
  function CloseModalHandler() {
    setIsModalOpen(false);
  }
}
