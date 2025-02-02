"use client";
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
import Image from "next/image";
import { ScanQrCode } from "lucide-react";
import { useState } from "react";
import EventeImage from "@/imgs/eventimage.png";
import { IconListDetails } from "@tabler/icons-react";
import BoxEvents from "@/components/boxEventsProfile";
import BoxEventsConclued from "@/components/boxEventsConclued";

const mockEvents = [
  {
    id: 1,
    title: "SECOMP 2025",
    date: "05 a 09 de Maio de 2025",
    location: "Auditório Paulo Petróla 08:00",
    organizer: "PET Computação UECE",
    image: EventeImage,
    curso: "COMPUTAÇÃO",
  },
  {
    id: 2,
    title: "Hackathon UECE",
    date: "15 a 17 de Junho de 2025",
    location: "Campus Itaperi - 09:00",
    organizer: "Departamento de Computação",
    image: EventeImage,
    curso: "COMPUTAÇÃO",
  },
  {
    id: 3,
    title: "WGESAD 2025",
    date: "15 a 17 de Junho de 2025",
    location: "Campus Itaperi - 09:00",
    organizer: "Departamento de Computação",
    image: EventeImage,
    curso: "COMPUTAÇÃO",
  },
  {
    id: 4,
    title: "Hackathon UECE",
    date: "15 a 17 de Junho de 2025",
    location: "Campus Itaperi - 09:00",
    organizer: "Departamento de Computação",
    image: EventeImage,
    curso: "COMPUTAÇÃO",
  },
  {
    id: 5,
    title: "Hackathon UECE",
    date: "15 a 17 de Junho de 2025",
    location: "Campus Itaperi - 09:00",
    organizer: "Departamento de Computação",
    image: EventeImage,
    curso: "COMPUTAÇÃO",
  },
];

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
                Cancel
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

  return (
    <section className="w-full flex">
      <Tabs
        defaultValue="EventosInscritos"
        className=" w-full flex flex-col  max-w-[1222px]"
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
            <BoxEvents events={mockEvents} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="EventosConcluidos">
          <h2 className="text-[44px] mt-[15px] font-extrabold text-[#3F4047]">
            Eventos anteriores
          </h2>
          <ScrollArea className="w-full h-[calc(100vh-300px)] border rounded-lg">
            <BoxEventsConclued events={mockEvents} />;
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
