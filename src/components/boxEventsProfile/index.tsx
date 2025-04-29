"use client";
import Image from "next/image";
import { useState } from "react";
import { ScanQrCode } from "lucide-react";
import { IconListDetails } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import FlbckImage from "../utils/fallback_image";

import EventButton from "@/components/boxEventsProfile/eventsButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Event = {
  id: number;
  title: string;
  date: string | null;
  location: string;
  time: string;
  organizer: string;
  image: string | null;
  curso: string;
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

// Componente de Modal para exibir o QR Code
const ModalQrCode = ({
  openModal,
  setOpenModal,
  qrUrl,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  qrUrl: string;
}) => {
  return (
    openModal && (
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="max-w-[800px]">
          <AlertDialogHeader className="flex flex-row justify-between">
            <AlertDialogTitle className="text-2xl font-bold text-green-800 mb-4">
              QR Code do Evento
            </AlertDialogTitle>
            <AlertDialogCancel
              className="border border-green-800 px-3 py-1 rounded"
              onClick={() => setOpenModal(false)}
            >
              Fechar
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="flex justify-center">
            <FlbckImage src={qrUrl} alt="QR Code" width={500} height={500} fallbackText="Não é possivel gerar um QR code para esse evento no momento"/>
          </div>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

const BoxEvents = ({ events }: { events: Event[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const generateQrCode = (eventId: number) => {
    const url = `http://127.0.0.1:8000/qr/image/${eventId}/1`;
    setQrUrl(url);
    setOpenModal(true);
  };

  return (
    <>
      {events
      .filter((events) => events.ended === false)
      .map((event: Event) => (
        <article key={event.id}>
          <h3 className="font-bold ml-[50px] py-5 text-[#3F4047] text-[25px]">
            {event.professorId.major.name}
          </h3>
          <div className="max-w-[1050px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-[30px]">

                {event.image && event.image.trim() !== "" ? (
                  <div className="w-[330px] h-[266px] relative">
                    <Image
                      alt="banner do evento"
                      src={event.image}
                      className="w-full h-full object-cover"
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
                    {event.name}
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
                  text="Gerar QR Code"
                  icon={<ScanQrCode size={93} color="#fff" />}
                  onClick={() => generateQrCode(event.id)}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
      <ModalQrCode
        openModal={openModal}
        setOpenModal={setOpenModal}
        qrUrl={qrUrl}
      />
    </>
  );
};

export default BoxEvents;
