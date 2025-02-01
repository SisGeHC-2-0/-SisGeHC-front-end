"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import { MessageCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SubmitCertificateForm from "@/components/pages/certificados";

const data = [
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2024",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Aprovado",
    statusColor: "text-green-500",
  },
  {
    title: "SESCOMP 2022",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Rejeitado",
    statusColor: "text-red-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2024",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Aprovado",
    statusColor: "text-green-500",
  },
  {
    title: "SESCOMP 2022",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Rejeitado",
    statusColor: "text-red-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2024",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Aprovado",
    statusColor: "text-green-500",
  },
  {
    title: "SESCOMP 2022",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Rejeitado",
    statusColor: "text-red-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
  {
    title: "SESCOMP 2024",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Aprovado",
    statusColor: "text-green-500",
  },
  {
    title: "SESCOMP 2022",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Rejeitado",
    statusColor: "text-red-500",
  },
  {
    title: "SESCOMP 2023",
    hours: "20 HORAS",
    type: "EXTENSÃO",
    date: "13/12/2023",
    status: "Em análise",
    statusColor: "text-yellow-500",
  },
];

const ModalFormsCertificados = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
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
    <section className="min-h-screen flex justify-center px-2">
      <Tabs
        defaultValue="account"
        className=" w-full flex flex-col gap-10 max-w-[1200px]"
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
          <ScrollArea className="w-full max-h-[710px] border rounded-lg">
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
                {data.map((item, index) => (
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
