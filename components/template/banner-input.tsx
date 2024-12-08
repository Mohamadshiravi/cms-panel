"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BannerInput() {
  const [bannerSrc, setBannerSrc] = useState<string | null>();
  const [profSrc, setProfSrc] = useState<string | null>();

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profFile, setProfFile] = useState<File | null>(null);

  useEffect(() => {
    if (bannerFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(bannerFile);
      fileReader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setBannerSrc(e.target?.result);
        }
      };
    }
  }, [bannerFile]);

  useEffect(() => {
    if (profFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(profFile);
      fileReader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setProfSrc(e.target?.result);
        }
      };
    }
  }, [profFile]);

  return (
    <div className="grid grid-cols-[1fr] relative">
      <label>
        <input
          accept="image/*"
          onChange={(e) => {
            e.target.files &&
              e.target.files.length > 0 &&
              setBannerFile(e.target.files[0]);
          }}
          type="file"
          className="absolute w-0 h-0 left-[3000px]"
        />
        <Image
          src={bannerSrc ? bannerSrc : "/img/pxfuel.jpg"}
          width={3000}
          height={3000}
          alt="banner"
          className="w-full h-[400px] rounded-md object-cover"
        />
      </label>
      <div className="sm:w-[290px] w-[200px] aspect-square rounded-lg overflow-hidden p-2 bg-zinc-800/70 absolute sm:top-[15%] top-[25%] left-[50%] right-[50%] translate-x-[50%]">
        <label>
          <input
            accept="image/*"
            onChange={(e) => {
              e.target.files &&
                e.target.files.length > 0 &&
                setProfFile(e.target.files[0]);
            }}
            type="file"
            className="absolute w-0 h-0 left-[3000px]"
          />
          <Image
            src={profSrc ? profSrc : "/img/me.jpg"}
            width={800}
            height={800}
            alt="prof"
            className="object-cover rounded-lg w-full h-full"
          />
        </label>
      </div>
    </div>
  );
}
