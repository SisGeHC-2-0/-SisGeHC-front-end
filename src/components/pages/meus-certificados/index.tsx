"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [enrollDateBegin, setEnrollDateBegin] = useState<Date | undefined>(
    undefined
  );
  const [enrollDateEnd, setEnrollDateEnd] = useState<Date | undefined>(
    undefined
  );
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [eventTimeBegin, setEventTimeBegin] = useState<string>("08:30");
  const [eventTimeEnd, setEventTimeEnd] = useState<string>("11:00");

  const onSubmit = async (data: any) => {
    if (!eventDate) {
      alert("Por favor, selecione uma data para o evento.");
      return;
    }

    const formData = new FormData();

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("picture", fileInput.files[0]);
    }

    formData.append("name", data.name);
    formData.append("desc_short", data.desc_short);
    formData.append("desc_detailed", data.desc_detailed);
    formData.append(
      "enroll_date_begin",
      enrollDateBegin ? format(enrollDateBegin, "yyyy-MM-dd") : ""
    );
    formData.append(
      "enroll_date_end",
      enrollDateEnd ? format(enrollDateEnd, "yyyy-MM-dd") : ""
    );
    formData.append("workload", String(data.workload));
    formData.append("minimum_attendances", String(data.minimum_attendances));
    formData.append("maximum_enrollments", String(data.maximum_enrollments));
    formData.append("address", data.address);
    formData.append("is_online", data.is_online);
    formData.append("ActivityTypeId", "1");
    formData.append("professorId", "1");

    try {
      const eventResponse = await fetch("http://127.0.0.1:8000/event/", {
        method: "POST",
        body: formData,
      });

      if (!eventResponse.ok) {
        const errorData = await eventResponse.json();
        console.error("Erro na resposta da API:", errorData);
        alert("Erro ao enviar evento.");
        return;
      }

      const eventData = await eventResponse.json();
      const eventId = eventData.id;

      const datePayload = {
        eventId: eventId,
        time_begin: eventTimeBegin + ":00",
        time_end: eventTimeEnd + ":00",
        date: format(eventDate, "yyyy-MM-dd"),
      };

      const dateResponse = await fetch("http://127.0.0.1:8000/event_date/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datePayload),
      });

      if (dateResponse.ok) {
        alert("Evento e datas enviados com sucesso!");
      } else {
        const errorData = await dateResponse.json();
        console.error("Erro ao enviar datas do evento:", errorData);
        alert("Erro ao enviar datas do evento.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao processar a requisição.");
    }
  };
  return (
    <ScrollArea className="w-full  border rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg "
      >
        <div className="space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Título do Evento
            </Label>
            <Input
              {...register("name")}
              placeholder="Nome do evento"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição do evento
            </Label>
            <Textarea
              {...register("desc_short")}
              placeholder="Descrição do evento"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Informações extras
            </Label>
            <Textarea
              {...register("desc_detailed")}
              placeholder="Informações extras"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </Label>

            <Select onValueChange={(value) => setValue("tipoHora", value)}>
              <SelectTrigger className="w-full border-gray-300">
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
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Banner capa do evento
            </Label>
            <div className="relative w-full h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
              <input
                type="file"
                {...register("picture", { required: true })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
              <div className="text-center">
                <svg
                  className="w-8 h-8 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">
                    Clique para enviar
                  </span>{" "}
                  ou arraste o arquivo aqui
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Localização</h2>
          <div className="border-b border-gray-300" />

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </Label>
            <Input
              {...register("address")}
              placeholder="Endereço do evento"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <Checkbox {...register("is_online")} className="mr-2" />
            <Label className="text-sm font-medium text-gray-700">
              Evento Online
            </Label>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Certificação</h2>
          <div className="border-b border-gray-300" />

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade de horas complementares atribuídas
            </Label>
            <Input
              type="string"
              {...register("workload")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Número mínimo de dias exigidos para emissão do certificado
            </Label>
            <Input
              type="text"
              {...register("minimum_attendances")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Dia e hora</h2>
          <div className="border-b border-gray-300" />

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Início da Inscrição
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={
                  enrollDateBegin ? format(enrollDateBegin, "dd-MM-yyyy") : ""
                }
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex justify-center flex-col items-center w-[350px]">
                  <DialogHeader>
                    <DialogTitle>Selecione a data de início</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={enrollDateBegin}
                    onSelect={(date) => {
                      setEnrollDateBegin(date);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Encerramento da inscrição
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={enrollDateEnd ? format(enrollDateEnd, "dd-MM-yyyy") : ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex justify-center flex-col items-center w-[350px]">
                  <DialogHeader>
                    <DialogTitle>Selecione a data de encerramento</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={enrollDateEnd}
                    onSelect={(date) => {
                      setEnrollDateEnd(date);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Número máximo de incrições no evento
            </Label>
            <Input
              type="text"
              {...register("maximum_enrollments")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Data do Evento
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={eventDate ? format(eventDate, "dd-MM-yyyy") : ""}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex justify-center flex-col items-center w-[350px]">
                  <DialogHeader>
                    <DialogTitle>Selecione a data do evento</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={eventDate}
                    onSelect={(date) => {
                      setEventDate(date);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Horário de Início
            </Label>
            <Input
              type="time"
              value={eventTimeBegin}
              onChange={(e) => setEventTimeBegin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Horário de Término
            </Label>
            <Input
              type="time"
              value={eventTimeEnd}
              onChange={(e) => setEventTimeEnd(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar Evento
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
}
