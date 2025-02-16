"use client";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Dot, Edit, Trash } from "lucide-react";
import eventosImage from "@/imgs/eventimage.png";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EventForm from "@/components/pages/meus-certificados";

export default function CertificadosEhorasComplementares() {
  const [openModal, setOpenModal] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/event/professor/1");
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  console.log("Eventos", events);
  return (
    <section className="w-full px-4">
      <h2 className="text-[#3F4047] text-[16px] mb-4 mt-5 font-extrabold">
        MEUS EVENTOS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <button onClick={() => setOpenModal(true)} className="w-full">
          <div className="flex justify-center items-center rounded-[12px] border-[#DCDCDC] border flex-col gap-3 min-h-[386px] ">
            <IconCirclePlusFilled size={100} color="#2F962F" />
            <p className="text-[#2F962F] text-[24px] font-bold">Novo Evento</p>
          </div>
        </button>

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <ModalFormsCertificados
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </section>
  );
}

const EventCard = ({ event }: any) => {
  const {
    name,
    desc_short,
    event_dates,
    picture,
    professorId,
    address,
    is_online,
  } = event;

  const eventDate = event_dates[0]?.date
    ? new Date(event_dates[0].date).toLocaleDateString("pt-BR")
    : "Data não disponível";
  const eventTime = event_dates[0]?.time_begin || "Horário não disponível";

  return (
    <article className="w-full max-w-[350px] mx-auto rounded-[12px] border border-gray-300 bg-white shadow-md">
      <figure className="w-full h-[104px]">
        <Image
          alt="event"
          src={picture || eventosImage}
          className="w-full h-full object-cover rounded-t-[12px]"
          width={316}
          height={104}
        />
      </figure>
      <div className="flex flex-col px-5 py-4 gap-3">
        <h2 className="flex items-center gap-2 font-bold text-black">
          <Dot size={20} color="#C49B00" />{" "}
          {is_online ? "ONLINE" : "PRESENCIAL"}
        </h2>

        <div className="">
          <h3 className="text-green-700 font-bold text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{desc_short}</p>
          <p className="text-gray-600 text-sm">{address}</p>
          <p className="text-gray-600 text-sm">
            {eventDate} - {eventTime}
          </p>
          <span className="text-gray-800 font-semibold text-sm">
            Realização:
          </span>
          <p className="text-gray-600 text-sm">{professorId.name}</p>
        </div>

        <div className="flex items-center gap-2 text-black font-semibold">
          <Calendar size={20} /> {event_dates.length} dia(s)
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-green-600 text-white font-semibold w-full max-w-[140px] h-[40px] rounded-lg transition hover:bg-green-700">
            ENTRAR
          </button>
          <div className="flex gap-2">
            <button className="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-teal-600 transition hover:bg-teal-700">
              <Edit size={20} color="#fff" />
            </button>
            <button className="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-red-600 transition hover:bg-red-700">
              <Trash size={20} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const ModalFormsCertificados = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  return (
    openModal && (
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="max-w-[800px] h-[calc(100vh-50px)]">
          <AlertDialogHeader className="flex flex-row items-center justify-between">
            <AlertDialogTitle className="text-2xl flex items-center font-bold text-green-800 ">
              Criar evento
            </AlertDialogTitle>
            <AlertDialogCancel
              className="border border-green-800"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </AlertDialogCancel>
          </AlertDialogHeader>
          <EventForm />
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};
