"use client";

import SubmitCertificateForm from "@/components/pages/certificados";
import EventForm from "@/components/pages/meus-certificados";
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
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { MessageCircle } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

const getStatus = (status: boolean | null) => {
  if (status === null) return { label: "Em análise", color: "text-yellow-500" };
  if (status === true) return { label: "Aprovado", color: "text-green-500" };
  return { label: "Rejeitado", color: "text-red-500" };
};

interface Certificate {
  title: string;
  hours: string;
  type: string;
  date: string;
  status: string;
  statusColor: string;
}

const fetchData = async (
  setCertificates: (value: SetStateAction<Certificate[]>) => void
) => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/complementary_activity/student/1/"
    );
    if (!response.ok) throw new Error("Erro ao buscar dados");

    const data = await response.json();
    const formattedData = data.map(
      (item: {
        status: boolean | null;
        workload: number;
        description: string;
        ActivityTypeId_id: number;
      }) => {
        const statusInfo = getStatus(item.status);
        return {
          title: item.description,
          hours: `${item.workload} HORAS`,
          type: `Tipo ${item.ActivityTypeId_id}`,
          date: "13/12/2024",
          status: statusInfo.label,
          statusColor: statusInfo.color,
        };
      }
    );
    setCertificates(formattedData);
  } catch (error) {
    console.error(error);
  }
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
        <AlertDialogContent className="max-w-[800px]">
          <AlertDialogHeader className="flex flex-row justify-between">
            <AlertDialogTitle className="text-2xl font-bold text-green-800 mb-4">
              Submeter certificado
            </AlertDialogTitle>
            <AlertDialogCancel
              className="border border-green-800"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </AlertDialogCancel>
          </AlertDialogHeader>
          <EventForm />
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  );
};

export default function CertificadosEhorasComplementares() {
  const [openModal, setOpenModal] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetchData(setCertificates);
  }, []);

  return (
    <section className="w-full flex">
      <div>
        <h2 className="text-[#3F4047] text-[16px] mb-2 mt-5 font-extrabold">
          MEUS EVENTOS
        </h2>
        <button onClick={() => setOpenModal(true)}>
          <div className="flex justify-center rounded-[12px] border-[#DCDCDC] border flex-col gap-3 min-h-[386px] w-[317px] items-center">
            <IconCirclePlusFilled size={150} color="#2F962F" />
            <p className="text-[#2F962F] text-[30px] font-bold">Novo Evento</p>
          </div>
        </button>
      </div>

      <ModalFormsCertificados
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </section>
  );
}
