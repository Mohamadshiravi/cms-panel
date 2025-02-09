"use client";

import { useEffect, useState } from "react";
import AddCourseModal from "./modals/addCourse";
import AddDiscountModal from "./modals/addDiscount";

export default function CourseModals({
  modal,
  CloseModal,
}: {
  modal: string | boolean;
  CloseModal: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function CloseModalHandler() {
    setIsModalOpen(false);
    setTimeout(() => {
      CloseModal();
    }, 300);
  }

  return (
    <>
      <section
        id="modal"
        onClick={CloseModalHandler}
        className={`${
          isModalOpen ? "opacity-100" : "opacity-0"
        } transition duration-300  w-full h-screen fixed top-0 left-0 bg-zinc-200/50 dark:bg-zinc-800/50 backdrop-blur-sm z-40 `}
      ></section>
      {modal === "course" && (
        <AddCourseModal
          isModalOpen={isModalOpen}
          CloseModalHandler={CloseModalHandler}
        />
      )}
      {modal === "discount" && (
        <AddDiscountModal
          isModalOpen={isModalOpen}
          CloseModalHandler={CloseModalHandler}
        />
      )}
    </>
  );
}
