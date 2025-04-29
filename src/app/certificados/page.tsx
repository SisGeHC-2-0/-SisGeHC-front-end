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
        activity_name: string;
      }) => {
        const statusInfo = getStatus(item.status);
        return {
          title: item.description,
          hours: `${item.workload} HORAS`,
          type: `Tipo ${item.activity_name}`,
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
              Fechar
            </AlertDialogCancel>
          </AlertDialogHeader>
          <SubmitCertificateForm />
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
      <Tabs
        defaultValue="submissaoDeCertificados"
        className="w-full flex flex-col gap-10 max-w-[1222px]"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-[550px]">
          <TabsTrigger value="horasComplementares">
            Horas Complementares
          </TabsTrigger>
          <TabsTrigger value="submissaoDeCertificados">
            Submissão de certificados
          </TabsTrigger>
        </TabsList>
        <TabsContent value="horasComplementares"></TabsContent>
        <TabsContent
          value="submissaoDeCertificados"
          className="flex flex-col gap-5"
        >
          <button onClick={() => setOpenModal(true)}>
            <div className="flex justify-center gap-3 items-center">
              <IconCirclePlusFilled size={50} color="#2F962F" />
              <p className="text-[#2F962F] text-[30px] font-bold">
                Submeter um novo certificado
              </p>
            </div>
          </button>
          <ScrollArea className="w-full h-[calc(100vh-300px)] border rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 sticky top-0 bg-white z-10">Título</th>
                  <th className="p-3 sticky top-0 bg-white z-10">Horas</th>
                  <th className="p-3 sticky top-0 bg-white z-10">Tipo</th>
                  <th className="p-3 sticky top-0 bg-white z-10">
                    Data de emissão
                  </th>
                  <th className="p-3 sticky top-0 bg-white z-10">Status</th>
                  <th className="p-3 sticky top-0 bg-white z-10">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-3 py-7">{item.title}</td>
                    <td className="px-3 py-7">{item.hours}</td>
                    <td className="px-3 py-7">{item.type}</td>
                    <td className="px-3 py-7">{item.date}</td>
                    <td className={`px-3 py-7 font-medium ${item.statusColor}`}>
                      {item.status}
                    </td>
                    <td className="p-3">
                      <MessageCircle className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
