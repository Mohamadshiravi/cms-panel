// components/Editor.js
"use client";
import React, { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import LoadingSvg from "../module/loading-svg";
import { useTypedDispatch } from "@/redux/typed-hooks";
import { addVeblogsToServer } from "@/redux/slices/veblog";
import swal from "sweetalert";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ align: [] }, { direction: "rtl" }],
  ],
};

interface TextEditorProp {
  CloseModal: () => void;
}

export default function TextEditor({ CloseModal }: TextEditorProp) {
  const [body, setBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [categoryes, setcategoryes] = useState([
    "فرانت اند",
    "بک اند",
    "امنیت",
    "فرعی",
    "مهارت های نرم",
  ]);
  const [titleInp, setTitleInp] = useState("");
  const [descInp, setDescInp] = useState("");
  const [blogCategotiInp, setBLogcategoryInp] = useState("");

  function CloseModalHandler() {
    setIsModalOpen(false);
    setTimeout(() => {
      CloseModal();
    }, 300);
  }

  async function AddVeblogHandler(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (blogCategotiInp === "") {
      setLoading(false);
      return swal({
        icon: "error",
        title: "دسته بندی را انتخاب کنید",
        buttons: ["اوکی", "بستن"],
      });
    }

    const veblog = {
      title: titleInp,
      desc: descInp,
      body: body,
      category: blogCategotiInp,
    };

    const res = await dispatch(addVeblogsToServer(veblog));

    if (res.payload) {
      setLoading(false);
      swal({
        icon: "success",
        title: "مقاله جدید اضافه شد",
        buttons: ["اوکی", "بستن"],
      });
      CloseModalHandler();
    } else {
      setLoading(false);
      swal({
        icon: "error",
        title: "مقاله جدید اضافه نشد",
        buttons: ["اوکی", "بستن"],
      });
    }
  }

  const dispatch = useTypedDispatch();

  return (
    <>
      <section
        id="modal"
        onClick={CloseModalHandler}
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } transition duration-300  w-full h-screen fixed top-0 left-0 bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-sm z-40 `}
      ></section>
      <form
        onSubmit={AddVeblogHandler}
        className={`${
          isModalOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-[10rem] opacity-0"
        } fade-animate md:px-28 fixed top-1 transition duration-300 left-[1%] w-[98%] bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg flex flex-col gap-3 z-50`}
      >
        <input
          value={titleInp}
          onChange={(e) => setTitleInp(e.target.value)}
          placeholder="عنوان مقاله"
          type="text"
          className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
        />
        <input
          value={descInp}
          onChange={(e) => setDescInp(e.target.value)}
          placeholder="درباره مقاله"
          type="text"
          className={`block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
        />
        <select
          onChange={(e) => setBLogcategoryInp(e.target.value)}
          value={blogCategotiInp}
          className="dark:bg-zinc-800 rounded-sm py-3 px-2 outline-none"
        >
          <option value={""} defaultChecked disabled>
            دسته بندی مقاله
          </option>
          {categoryes.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          modules={modules}
          style={{
            fontFamily: "moraba-regular, sans-serif",
          }}
        />
        <div className="flex gap-3 mt-4">
          <button
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
          <span
            onClick={CloseModalHandler}
            className="bg-red-600 cursor-pointer hover:bg-red-700 flex items-center justify-center shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-500/20 transition w-full rounded-md text-xl text-white"
          >
            لغو
          </span>
        </div>
      </form>
    </>
  );
}
