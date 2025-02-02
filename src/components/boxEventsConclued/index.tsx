"use client";
import Image, { StaticImageData } from "next/image";
import { ScanQrCode } from "lucide-react";
import { IconCertificate, IconListDetails } from "@tabler/icons-react";
import EventButton from "../boxEventsProfile/eventsButton";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  organizer: string;
  image: StaticImageData;
  curso: string;
};

const BoxEventsConclued = ({ events }: { events: Event[] }) => {
  return (
    <>
      {events.map((event: Event) => (
        <article key={event.id}>
          <h3 className="font-bold ml-[50px] py-5 text-[#3F4047] text-[25px]">
            {event.curso}
          </h3>
          <div className="max-w-[1050px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-[30px]">
                <Image
                  alt="banner do evento"
                  src={event.image}
                  width={330}
                  height={266}
                />
                <div className="flex flex-col gap-2 max-w-[296px]">
                  <h2 className="text-[#016A2F] text-[38px] font-bold">
                    {event.title}
                  </h2>
                  <p className="text-[19px] text-[#707070]">
                    {event.date} {event.location}
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

export default BoxEventsConclued;
