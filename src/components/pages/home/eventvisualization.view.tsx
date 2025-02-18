"use client";
import { IconMenuDeep } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MyCarousel = ({
  events,
  enrolledEvents,
  enrollInEvent,
}: {
  events: Event[];
  enrolledEvents: number[];
  enrollInEvent: (id: number) => void;
}) => {
  const slidesPerView = events.length < 4 ? events.length : 4;
  const loop = events.length >= 4;

  return (
    <Swiper
      spaceBetween={20}
      autoplay
      slidesPerView={slidesPerView}
      loop={loop}
      className="px-4"
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <BoxEventView
            event={event}
            enrolledEvents={enrolledEvents}
            enrollInEvent={enrollInEvent}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

type Major = {
  id: number;
  name: string;
};

type Professor = {
  id: number;
  name: string;
  email: string;
  enrollment_number: string;
  major: Major;
};

type EventDate = {
  id: number;
  eventId: number;
  time_begin: string;
  time_end: string;
  date: string;
};

type Event = {
  time_begin: string;
  id: number;
  name: string;
  desc_short: string;
  desc_detailed: string;
  enroll_date_begin: string;
  enroll_date_end: string;
  picture: string;
  workload: number;
  minimum_attendances: number;
  maximum_enrollments: number;
  address: string;
  is_online: boolean;
  ended: boolean;
  ActivityTypeId: number;
  professorId: Professor;
  event_dates: EventDate[];
  current_enrollments: number;
};

export default function EventView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [enrolledEvents, setEnrolledEvents] = useState<number[]>([]); // Estado para armazenar eventos inscritos

  const fetchEvents = async () => {
    try {
      const [eventRes, dateRes] = await Promise.all([
        fetch("http://localhost:8000/event/"),
        fetch("http://localhost:8000/event_date/"),
      ]);

      if (!eventRes.ok || !dateRes.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const eventData = await eventRes.json();
      const eventDates = await dateRes.json();

      const eventsWithDates = eventData.map((event: Event) => ({
        ...event,
        event_dates: eventDates.filter(
          (date: EventDate) => date.eventId === event.id
        ),
      }));

      setEvents(eventsWithDates);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const enrollInEvent = async (eventId: number) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/enrollment/event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: 1, eventId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes("Student is already enrolled in this event.")) {
          setEnrolledEvents((prev) => [...prev, eventId]);
          return;
        }
        throw new Error(errorText);
      }

      setEnrolledEvents((prev) => [...prev, eventId]);
      alert("Inscrição realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao se inscrever:", error);
      alert("Erro ao se inscrever no evento");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-[1200px] flex flex-col gap-10 mx-auto">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-start text-2xl font-bold mb-4 ml-1">
            COMPUTAÇÃO
          </h2>
          <MyCarousel
            events={events}
            enrolledEvents={enrolledEvents}
            enrollInEvent={enrollInEvent}
          />
        </div>
        <div>
          <h2 className="text-start text-2xl font-bold mb-4 ml-1">
            COMPUTAÇÃO
          </h2>
          <MyCarousel
            events={events}
            enrolledEvents={enrolledEvents}
            enrollInEvent={enrollInEvent}
          />
        </div>
      </div>
    </div>
  );
}

const BoxEventView = ({
  event,
  enrolledEvents,
  enrollInEvent,
}: {
  event: Event;
  enrolledEvents: number[];
  enrollInEvent: (id: number) => void;
}) => {
  const isEnrolled = enrolledEvents.includes(event.id);

  return (
    <article className="max-w-[316px] w-full min-h-[350px] border rounded-2xl shadow-lg bg-white overflow-hidden flex flex-col">
      {event.picture ? (
        <figure className="max-h-[105px]">
          <Image
            alt="bannerEvent"
            src={event.picture}
            width={316}
            height={105}
            className="object-cover max-h-[105px]"
          />
        </figure>
      ) : (
        <div className="w-[316px] h-[105px] bg-gray-200" />
      )}

      <div className="flex flex-col justify-start gap-2 p-4 flex-grow min-h-[130px]">
        <h2 className="text-[#016A2F] min-h-[60px] text-[24px] font-bold leading-tight break-words">
          {event.name}
        </h2>
        <div className="text-gray-600 text-sm">
          <div className="flex flex-col flex-wrap">
              {event.event_dates.map((date) => (
                <div key={date.id}>
                  <span>
                    {parseDateWithoutTimezone(date.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span> - {date.time_begin} às {date.time_end}</span>
                </div>
              ))}
        </div>
        </div>
        <p className="text-gray-700 font-medium">
          Realização: {event.professorId.name}
        </p>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button
          onClick={() => enrollInEvent(event.id)}
          disabled={isEnrolled}
          className={`w-full h-[40px] rounded-lg transition font-semibold ${
            isEnrolled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-[#26BB4B] text-white hover:bg-[#1f9a3e]"
          }`}
        >
          {isEnrolled ? "INSCRITO" : "INSCREVA-SE"}
        </button>
        <button className="w-[50px] h-[40px] flex items-center justify-center rounded-lg bg-[#00A285] transition hover:bg-[#008a72]">
          <IconMenuDeep color="#fff" stroke={2} />
        </button>
      </div>
    </article>
  );
};

const parseDateWithoutTimezone = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1));
};

const formatEventDates = (dates: EventDate[]) => {
  if (dates.length === 0) return "";

  return dates
    .map((date) => {
      const parsedDate = parseDateWithoutTimezone(date.date);
      return parsedDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    })
    .join(", "); // Para exibir todas separadas por vírgula, ou use "\n" para quebrar linha.
};


