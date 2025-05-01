'use client'

import { FieldValues, useForm } from "react-hook-form"
import InputFormField from "./inputFormField";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ProfessorForms() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [foto, setFoto] = useState<File | null>(null);
    const [majors, setMajors] = useState<{ id: number, nome: string }[]>([]);
    const [selectedMajor, setSelectedMajor] = useState<number | null>(null);

    // Busca os cursos no backend
    useEffect(() => {
        const fetchMajors = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/major/');
                const data = await res.json();
                setMajors(data);
            } catch (err) {
                console.error("Erro ao buscar cursos:", err);
            }
        };

        fetchMajors();
    }, []);

    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();

        formData.append("name", data.Nome);
        formData.append("email", data.Email);
        formData.append("enrollment_number", data.Matricula);
        formData.append("password", data.Senha);
        if (selectedMajor !== null) {
            formData.append("majorId", selectedMajor.toString());
        }
        if (foto) {
            formData.append("picture", foto);
        }
        if (data.Senha != data.Confirme){
            alert("Senhas nao correspondem");
        }
        else{

        try {
            const response = await fetch("http://127.0.0.1:8000/professor/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erro ao criar professor");
            }

            alert("Professor criado com sucesso!");
        } catch (err) {
            console.error(err);
            alert("Erro ao criar professor");
        }
        }
    };

    return (
        <div>
            Formulário de Professor
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center items-center" encType="multipart/form-data">
                <div className="w-1/2 flex flex-col gap-6">
                    <InputFormField
                        errors={errors}
                        required
                        placeholder="Digite seu nome."
                        name="Nome"
                        type="text"
                        register={register}
                    />
                    <InputFormField
                        errors={errors}
                        required
                        placeholder="exemplo@aluno.uece.br"
                        name="Email"
                        type="email"
                        register={register}
                    />
                    <InputFormField
                        errors={errors}
                        required
                        placeholder="Digite sua matrícula."
                        name="Matricula"
                        type="text"
                        register={register}
                    />
                    <InputFormField
                        errors={errors}
                        required
                        placeholder="Digite sua senha."
                        name="Senha"
                        type="password"
                        register={register}
                    />
                    <InputFormField
                        errors={errors}
                        required
                        placeholder="Confirme sua senha."
                        name="Confirme"
                        type="password"
                        register={register}
                    />

                    {/* Select de curso */}
                    <div>
                        <label htmlFor="curso" className="block text-sm font-medium text-gray-700">Curso</label>
                        <select
                            id="curso"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            onChange={(e) => setSelectedMajor(Number(e.target.value))}
                        >
                            <option value="">Selecione um curso</option>
                            {majors.map((major) => (
                                <option key={major.id} value={major.id}>
                                    {major.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Upload de imagem */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFoto(e.target.files[0]);
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        variant="default"
                        className="h-[7vh] bg-green-700 font-bold text-md"
                    >
                        Criar conta
                    </Button>
                </div>
            </form>
        </div>
    );
}

export { ProfessorForms };
