"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SubmitCertificateForm() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const isConfirmed = watch("isConfirmed", false);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("tipoHora", data.tipoHora);
    formData.append("quantidadeHoras", data.quantidadeHoras);
    formData.append("descricao", data.descricao);
    if (data.arquivo && data.arquivo.length > 0) {
      formData.append("arquivo", data.arquivo[0]);
    }

    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Certificado enviado com sucesso!");
      } else {
        alert("Erro ao enviar certificado.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-full w-full mx-auto bg-white rounded-lg shadow-md"
    >
      <Label className="block mb-2 text-[25px] text-green-800">
        Tipo de hora complementar
      </Label>
      <Select onValueChange={(value) => setValue("tipoHora", value)}>
        <SelectTrigger className="w-full border-green-800">
          <SelectValue placeholder="Selecione o tipo de hora complementar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ensino">Ensino</SelectItem>
          <SelectItem value="pesquisaEProducaoCientifica">
            Pesquisa e produção científica
          </SelectItem>
          <SelectItem value="geral">Geral</SelectItem>
          <SelectItem value="extensao">Extensão</SelectItem>
          <SelectItem value="esportivo">Esportivo</SelectItem>
          <SelectItem value="cultural">Cultural</SelectItem>
        </SelectContent>
      </Select>

      <Label className="block text-[25px] mt-4 mb-2 text-green-800">
        Quantas horas correspondem ao certificado?
      </Label>
      <Input
        type="number"
        placeholder="Informe a quantidade de horas que tem no certificado"
        className="w-full border-green-800"
        {...register("quantidadeHoras")}
      />

      <Label className="block text-[25px] mt-4 mb-2 text-green-800">
        Descrição/Título do certificado?
      </Label>
      <Textarea
        placeholder="Informe o que se trata seu certificado"
        className="w-full border-green-800"
        {...register("descricao")}
      />

      <Label className="block text-[25px] mt-4 mb-2 text-green-800">
        Escolher um arquivo
      </Label>
      <Input
        type="file"
        accept=".pdf"
        className="w-full  border-green-800"
        {...register("arquivo")}
      />
      <p className="text-sm text-gray-600">Apenas arquivos .pdf</p>

      <div className="flex items-center mt-4">
        <Checkbox
          id="confirm"
          checked={isConfirmed}
          onCheckedChange={(value) => setValue("isConfirmed", value)}
        />
        <Label htmlFor="confirm" className="ml-2 text-gray-700">
          Eu confirmo que todas as informações são verdadeiras.
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full mt-4 bg-green-600 hover:bg-green-700"
        disabled={!isConfirmed}
      >
        ENVIAR
      </Button>
    </form>
  );
}
