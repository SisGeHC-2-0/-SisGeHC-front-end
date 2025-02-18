"use client";
import { useEffect, useState } from "react";
import BoxEventsConclued from "@/components/boxEventsConclued";
import BoxEvents from "@/components/boxEventsProfile";
import SubmitCertificateForm from "@/components/pages/certificados";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fetchEvents = async () => {
  try {
    const responseEvents = await fetch("http://127.0.0.1:8000/event/student/1");
    const events = await responseEvents.json();
    const responseEventDates = await fetch("http://127.0.0.1:8000/event_date/");
    const eventDates = await responseEventDates.json();
    console.log("Eventos: ",events)

    return events.map(
      (event: {
        event_dates: any[];
        id: any;
        name: any;
        is_online: any;
        address: any;
        professorId: { name: any; major: { name: any } };
        picture: any;
        ended: any;
      }) => {
        const dateInfo = eventDates.find(
          (date: { id: any }) => date.id === event.event_dates[0]?.id
        );
        // console.log("AAAA: ", event.event_dates[0]?.date)
        console.log("AAAA: ", event.event_dates[0])
        console.log("Eventos recebidos:", events);
        console.log("Datas dos eventos recebidas:", eventDates);
        return {
          id: event.id,
          title: event.name,
          date: dateInfo ? dateInfo.date : "Data não disponível",
          time: dateInfo.time_begin,
          location: event.is_online ? "Online" : event.address,
          organizer: event.professorId.name,
          image: event.picture,
          curso: event.professorId.major.name,
          ended: event.ended
        };
      }
    );
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return [];
  }
};

const ModalFormsCertificados = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}) => {
  return (
    <div>
      {openModal && (
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
          <AlertDialogContent className="max-w-[800px]">
            <AlertDialogHeader className="flex flex-row justify-between">
              <AlertDialogTitle className="text-2xl font-bold text-green-800 mb-4">
                Submeter certificado
              </AlertDialogTitle>
              <AlertDialogCancel
                className="border border-green-800"
                onClick={() => setOpenModal(false)}
              >
                Fechar
              </AlertDialogCancel>
            </AlertDialogHeader>
            <SubmitCertificateForm />
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default function CertificadosEhorasComplementares() {
  const [openModal, setOpenModal] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <section className="w-full flex">
      <Tabs
        defaultValue="EventosInscritos"
        className=" w-full flex flex-col max-w-[1222px]"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-[550px]">
          <TabsTrigger
            value="EventosInscritos"
            className="text-[25px] font-bold"
          >
            Eventos Inscritos
          </TabsTrigger>
          <TabsTrigger
            value="EventosConcluidos"
            className="text-[25px] font-bold"
          >
            Eventos Concluidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="EventosInscritos">
          <h2 className="text-[44px] mt-[15px] font-extrabold text-[#3F4047]">
            Seus Eventos
          </h2>
          <ScrollArea className="w-full h-[calc(100vh-300px)] border rounded-lg">
            <BoxEvents events={events} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="EventosConcluidos">
          <h2 className="text-[44px] mt-[15px] font-extrabold text-[#3F4047]">
            Eventos anteriores
          </h2>
          <ScrollArea className="w-full h-[calc(100vh-300px)] border rounded-lg">
            <BoxEventsConclued events={events} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <ModalFormsCertificados
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </section>
  );
}
