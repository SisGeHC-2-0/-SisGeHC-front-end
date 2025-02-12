"use client";
import { IconMenuDeep } from "@tabler/icons-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import EventImageHone from "@/imgs/testeimage.png";
import { useEffect, useState } from "react";

export default function EventView() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/event/?major_name=${majorName}`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">
        {loading ? "Evento" : "Cursos"}
      </h2>
      
      {loading ? (
        <div>Carregando...</div>
      ) : (
        Object.entries(
          events.reduce((acc, event) => {
            const curso = event.professorId.major.name;
            // const curso = event.professorId
            if (!acc[curso]) acc[curso] = [];
            acc[curso].push(event);
            return acc;
          }, {} as Record<string, typeof events>)
        ).map(([curso, eventos]) => (
          <div key={curso} className="mb-6 w-full">
            <h3 className="text-xl font-bold mb-">{curso}</h3> 
            <MyCarousel events={eventos} />
          </div>
        ))
      )}
    </div>
  );
  

}

const MyCarousel = ({ events }) => (
  <Swiper
    spaceBetween={20}
    slidesPerView={3}
    loop={true}
    pagination={{ clickable: true }}
    className="px-4"
  >
    {events.map((events) => (
      <SwiperSlide key={events.id}>
        <BoxEventView events={events} />
      </SwiperSlide>
    ))}
  </Swiper>
);

const BoxEventView = ({ events }) => {
  return (
    <article className="max-w-[316px] w-full min-h-[274px] rounded-2xl shadow-lg bg-white overflow-hidden">
      <div className="flex-shrink-0 w-full h-[105px] overflow-hidden"> {/* Contêiner com tamanho fixo */}
      <Image
        alt="bannerEvent"
        src={events.picture || EventImageHone}
        width={316}
        height={105}
        
        className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-[#016A2F] text-[32px] font-bold leading-tight">
          {events.name}
        </h2>
        <p className="text-gray-600 text-sm">
          {events.enroll_date_begin} • {events.address}
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
