"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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
  const [openRow, setOpenRow] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/complementary_activity/coordenador/2"
        );
        const data = await response.json();

        // Verifica se a resposta é um array ou um único objeto
        const formattedData = Array.isArray(data) ? data : [data];

        setCertificates(
          formattedData.map((item, index) => ({
            id: index + 1, // Garante um ID único
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

  const toggleRow = (id: number) => {
    setOpenRow(openRow === id ? null : id);
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
                  <th className="p-3 sticky top-0 bg-white z-10">Descrição</th>
                  <th className="p-3 sticky top-0 bg-white z-10">
                    Carga horária
                  </th>
                </tr>
              </thead>

              <tbody>
                {certificates.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      className="border-t cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleRow(item.id)}
                    >
                      <td className="px-3 py-4">{item.student_name}</td>
                      <td className="px-3 py-4">{item.activity_name}</td>
                      <td className="px-3 py-4">{item.description}</td>
                      <td className="px-3 py-4">{item.workload}</td>
                    </tr>
                    {openRow === item.id && (
                      <tr>
                        <td colSpan={4} className="p-4 bg-gray-50 border-t">
                          <div className="mb-4">
                            <iframe
                              src={item.certificate_file}
                              width="100%"
                              height="500px"
                              className="border rounded-lg"
                            />
                          </div>
                          <div className="flex justify-end gap-4">
                            <Button variant="destructive">Recusar</Button>
                            <Button variant="default">Aceitar</Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </section>
  );
}
