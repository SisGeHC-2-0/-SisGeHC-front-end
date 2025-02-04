"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const data = [
  {
    id: 1,
    name: "Natália Ruth Mesquita da Silva",
    categoria: "Ensino",
    description: "Programa de educação tutorial PET - SEDUC",
    carga: "1.680",
    pdfUrl: "http://127.0.0.1:8000/files/certificates/PDF-teste_S3GyuDm.pdf",
  },
];

export default function ValidarCertificados() {
  const [openRow, setOpenRow] = useState<number | null>(null);

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
                  <th className="p-3 sticky top-0 bg-white z-10">Categoria</th>
                  <th className="p-3 sticky top-0 bg-white z-10">Descrição</th>
                  <th className="p-3 sticky top-0 bg-white z-10">
                    Carga horária
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <>
                    <tr
                      key={index}
                      className="border-t cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleRow(item.id)}
                    >
                      <td className="px-3 py-4">{item.name}</td>
                      <td className="px-3 py-4">{item.categoria}</td>
                      <td className="px-3 py-4">{item.description}</td>
                      <td className="px-3 py-4">{item.carga}</td>
                    </tr>
                    {openRow === item.id && (
                      <tr>
                        <td colSpan={4} className="p-4 bg-gray-50 border-t">
                          <div className="mb-4">
                            <iframe
                              src="http://127.0.0.1:8000/files/certificates/PDF-teste_S3GyuDm.pdf"
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
                  </>
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
