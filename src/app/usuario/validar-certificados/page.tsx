"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Certificate {
  id: number;
  student_name: string;
  activity_name: string;
  description: string;
  workload: number;
  certificate_file: string;
}

export default function ValidarCertificados() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/complementary_activity/coordenador/2"
        );
        const data = await response.json();

        const formattedData = Array.isArray(data) ? data : [data];

        setCertificates(
          formattedData.map((item, index) => ({
            id: item.id,
            student_name: item.student_name,
            activity_name: item.activity_name,
            description: item.description,
            workload: item.workload,
            certificate_file: item.certificate_file,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar certificados:", error);
      }
    }

    fetchData();
  }, []);

  const toggleRow = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsDialogOpen(true);
  };

  const handleAction = async (id: number, status: boolean) => {
    try {
      await fetch(`http://127.0.0.1:8000/complementary_activity/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
          feedback: "",
        }),
      });

      setCertificates(certificates.filter((item) => item.id !== id));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
    }
  };

  return (
    <section className="w-full flex">
      <Tabs
        defaultValue="Solicitacoesdevalidacao"
        className="w-full flex flex-col gap-10 max-w-[1222px]"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-[550px]">
          <TabsTrigger value="Solicitacoesdevalidacao">
            Solicitações de validação
          </TabsTrigger>
          <TabsTrigger value="Certificadosvalidados">
            Certificados validados
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="Solicitacoesdevalidacao"
          className="flex flex-col gap-5"
        >
          <ScrollArea className="w-full h-[calc(100vh-300px)] border rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 sticky top-0 bg-white z-10">Aluno</th>
                  <th className="p-3 sticky top-0 bg-white z-10">Atividade</th>
                  <th className="p-3 sticky top-0 bg-white z-10">Titulo</th>
                  <th className="p-3 sticky top-0 bg-white z-10">
                    Carga horária
                  </th>
                </tr>
              </thead>

              <tbody>
                {certificates.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleRow(item)}
                  >
                    <td className="px-3 py-4">{item.student_name}</td>
                    <td className="px-3 py-4">{item.activity_name}</td>
                    <td className="px-3 py-4">{item.description}</td>
                    <td className="px-3 py-4">{item.workload} h</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full overflow-auto">
          <DialogHeader>
            <DialogTitle>Visualizar Certificado</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="mb-4 h-full">
              <iframe
                src={selectedCertificate.certificate_file}
                width="100%"
                height="100%"
                className="border rounded-lg min-h-[80vh]"
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() =>
                selectedCertificate &&
                handleAction(selectedCertificate.id, false)
              }
            >
              Recusar
            </Button>
            <Button
              variant="default"
              onClick={() =>
                selectedCertificate &&
                handleAction(selectedCertificate.id, true)
              }
            >
              Aceitar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
