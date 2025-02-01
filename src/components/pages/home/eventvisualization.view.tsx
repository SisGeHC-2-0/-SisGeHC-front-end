"use client";
import { Swiper, SwiperSlide } from "swiper/react";

export default function EventView() {
  return (
    <div className="">
      <div>
        <MyCarousel />
      </div>
    </div>
  );
}
const MyCarousel = () => (
  <Swiper spaceBetween={50} slidesPerView={1}>
    <h2>COMPUTAÇÃO</h2>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
  </Swiper>
);
