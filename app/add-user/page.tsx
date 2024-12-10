"use client";

import LoadingSvg from "@/components/module/loading-svg";
import BannerInput from "@/components/template/banner-input";
import { addUserToServer } from "@/redux/slices/user";
import { useTypedDispatch } from "@/redux/typed-hooks";
import { useFormik } from "formik";
import { FormEvent, useState } from "react";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object({
  password: yup
    .string()
    .required("رمز را وارد کنید")
    .min(8, "رمز باید حدئقل 8 حرف باشد"),
  age: yup
    .number()
    .required("سن را وارد کنید")
    .min(10, "سن واقعی وارد کنید")
    .max(90, "سن واقعی وارد کنید"),
  email: yup
    .string()
    .required("ایمیل را وارد کنید")
    .email("ایمیل را صحیح وارد کنید"),
  username: yup
    .string()
    .required("نام کاربری را وارد کنید")
    .min(3, "نام کاربری حدئقل 3 حرف "),
  lastname: yup
    .string()
    .required("نام خانوادگی را وارد کنید")
    .min(3, "نام خانوادگی را کامل وارد کنید"),
  firstname: yup
    .string()
    .required("نام را وارد کنید")
    .min(2, "نام را کامل وارد کنید"),
});

export default function UserDetails() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstname: "", // اصلاح نام فیلد
      lastname: "",
      username: "",
      email: "",
      age: 0,
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await dispatch(addUserToServer(values));
      console.log(res);

      if (res.payload) {
        setLoading(false);
        formik.resetForm();
        swal({
          icon: "success",
          title: "کاربر اضافه شد",
          buttons: ["اوکی", "بستن"],
        });
      } else {
        setLoading(false);
        swal({
          icon: "error",
          title: "کاربر اضافه نشد",
          buttons: ["اوکی", "بستن"],
        });
      }
    },
  });

  function BeforeSubmit(e: FormEvent) {
    e.preventDefault();
    if (Object.keys(formik.errors).length > 0) {
      swal({
        icon: "error",
        title: "لطفاً تمام خطاهای فرم را برطرف کنید.",
        buttons: ["اوکی", "بستن"],
      });
    } else {
      formik.handleSubmit();
    }
  }

  const dispatch = useTypedDispatch();

  return (
    <section className="sm:p-6 p-3 bg-white dark:bg-zinc-900 min-h-full">
      <form onSubmit={BeforeSubmit} className="flex flex-col gap-6">
        <BannerInput />
        <div className="grid grid-cols-[1fr] md:grid-cols-[6fr_6fr] gap-6">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstname}
            name="firstname"
            placeholder="نام"
            type="text"
            className={`form-input ${
              formik.touched.firstname && formik.errors.firstname
                ? "border-b-red-600 dark:border-b-red-800"
                : formik.touched.firstname &&
                  "border-b-green-600 dark:border-b-green-800"
            } block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
          />
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastname}
            name="lastname"
            placeholder="نام خانوادگی"
            type="text"
            className={`form-input ${
              formik.touched.lastname && formik.errors.lastname
                ? "border-b-red-600 dark:border-b-red-800"
                : formik.touched.lastname &&
                  "border-b-green-600 dark:border-b-green-800"
            } block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
          />
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[6fr_6fr] gap-6">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            name="username"
            placeholder="نام کاربری"
            type="text"
            className={`form-input ${
              formik.touched.username && formik.errors.username
                ? "border-b-red-600 dark:border-b-red-800"
                : formik.touched.username &&
                  "border-b-green-600 dark:border-b-green-800"
            } block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
          />
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            placeholder="ایمیل"
            type="email"
            className={`form-input ${
              formik.touched.email && formik.errors.email
                ? "border-b-red-600 dark:border-b-red-800"
                : formik.touched.email &&
                  "border-b-green-600 dark:border-b-green-800"
            } block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
          />
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[6fr_6fr] gap-6 md:mt-0 mt-8">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            name="age"
            placeholder="سن"
            type="number"
            className={`form-input ${
              formik.touched.age && formik.errors.age
                ? "border-b-red-600 dark:border-b-red-800"
                : formik.touched.email &&
                  "border-b-green-600 dark:border-b-green-800"
            } block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
          />
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
            placeholder="گذرواژه"
            type="password" // اصلاح نوع ورودی
            className={`form-input ${
              formik.touched.password && formik.errors.password
                ? "border-b-red-600 dark:border-b-red-800"
                : formik.touched.password &&
                  "border-b-green-600 dark:border-b-green-800"
            } block w-full border-2 border-zinc-200 dark:border-zinc-800 bg-inherit rounded-sm border-b-4 px-3 py-2 text-lg outline-none`}
          />
        </div>
        {formik.errors && (
          <ul className="dark:bg-red-600 bg-red-300 w-full px-3 flex flex-col rounded-md text-red-950 font-bold">
            {formik.errors.firstname && (
              <li className="my-1">{formik.errors.firstname}</li>
            )}
            {formik.errors.lastname && (
              <li className="my-1">{formik.errors.lastname}</li>
            )}
            {formik.errors.username && (
              <li className="my-1">{formik.errors.username}</li>
            )}
            {formik.errors.email && (
              <li className="my-1">{formik.errors.email}</li>
            )}
            {formik.errors.password && (
              <li className="my-1">{formik.errors.password}</li>
            )}
          </ul>
        )}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-500/20 transition w-full rounded-md text-xl text-white"
        >
          {loading ? (
            <LoadingSvg width={60} />
          ) : (
            <span className="my-4"> ثبت اطلاعات</span>
          )}
        </button>
      </form>
    </section>
  );
}
