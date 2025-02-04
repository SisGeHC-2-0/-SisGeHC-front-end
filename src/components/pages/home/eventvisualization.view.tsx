"use client";
import { IconMenuDeep } from "@tabler/icons-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import EventImageHone from "@/imgs/testeimage.png";

export default function EventView() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">COMPUTAÇÃO</h2>
      <MyCarousel />
    </div>
  );
}

const MyCarousel = () => (
  <Swiper
    spaceBetween={20}
    slidesPerView={3}
    loop={true}
    // navigation={true}
    pagination={{ clickable: true }} // Paginação interativa
    // modules={[Navigation, Pagination]}
    className="px-4"
  >
    {Array.from({ length: 5 }).map((_, index) => (
      <SwiperSlide key={index}>
        <BoxEventView />
      </SwiperSlide>
    ))}
  </Swiper>
);

const BoxEventView = () => {
  return (
    <article className="max-w-[316px] w-full min-h-[274px] rounded-2xl shadow-lg bg-white overflow-hidden">
      <Image
        alt="bannerEvent"
        src={EventImageHone}
        width={316}
        height={105}
        className="object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-[#016A2F] text-[32px] font-bold leading-tight">
          SECOMP 2025
        </h2>
        <p className="text-gray-600 text-sm">
          05 a 09 de Maio de 2025 • Auditório Paulo Petróla • 08:00
        </p>
        <p className="text-gray-700 font-medium">Realização:</p>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button className="bg-[#26BB4B] text-white font-semibold w-full h-[40px] rounded-lg transition hover:bg-[#1f9a3e]">
          INSCREVA-SE
        </button>
        <button className="w-[50px] h-[40px] flex items-center justify-center rounded-lg bg-[#00A285] transition hover:bg-[#008a72]">
          <IconMenuDeep color="#fff" stroke={2} />
        </button>
      </div>
    </article>
  );
};
