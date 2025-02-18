"use client";
import Image from "next/image";
import { ScanQrCode } from "lucide-react";
import { IconCertificate, IconListDetails } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import EventButton from "../boxEventsProfile/eventsButton";

type Event = {
  id: number;
  title: string;
  date: string | null;
  location: string;
  time: string;
  organizer: string;
  image: string | null;
  curso: string;
  ended: boolean;
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Data não disponível";
  try {
    const date = parseISO(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    return "Data inválida";
  }
};

const BoxEvents = ({ events }: { events: Event[] }) => {
  return (
    <>
      {events.filter((events) => events.ended === true) // Filtro.
      .map((event: Event) => (
        <article key={event.id}>
          <h3 className="font-bold ml-[50px] py-5 text-[#3F4047] text-[25px]">
            {event.curso}
          </h3>
          <div className="max-w-[1050px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-[30px]">
                {event.image && event.image.trim() !== "" ? (
                  <div className="w-[330px] h-[266px] relative">
                    <Image
                      alt="banner do evento"
                      src={
                        event.image && event.image.trim() !== ""
                          ? event.image
                          : "/placeholder.jpg"
                      }
                      className="w-full h-full object-cover "
                      width={330}
                      height={266}
                    />
                  </div>
                ) : (
                  <div className="w-[330px] h-[266px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagem não disponível</span>
                  </div>
                )}

                <div className="flex flex-col gap-2 max-w-[296px]">
                  <h2 className="text-[#016A2F] text-[38px] font-bold">
                    {event.title}
                  </h2>
                  <p className="text-[19px] text-[#707070] leading-6">
                    {formatDate(event.date)}
                    <br />
                    {event.location}
                    <br />
                    {event.time || "Horário não disponível"}
                  </p>
                  <p className="text-[#707070]">
                    <span className="font-bold text-[#707070]">
                      Realização:
                    </span>
                    <br />
                    {event.organizer}
                  </p>
                </div>
              </div>
              <div className="flex gap-[35px]">
                <EventButton
                  text="Detalhes do Evento"
                  icon={<IconListDetails stroke={2} size={93} color="#fff" />}
                  onClick={() => console.log("Clicado!")}
                />
                <EventButton
                  text="Certificado"
                  icon={<IconCertificate size={93} color="#fff" />}
                  onClick={() => console.log("Clicado!")}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default BoxEvents;
