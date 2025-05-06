'use client'

import { FieldValues, useForm } from "react-hook-form"
import InputFormField from "../../../components/formComponents/inputFormField";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DropDownFormField, { OptionsType } from "@/components/formComponents/dropDownFormField";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"


const fileSizeLimit = 5 * 1024 * 1024; // 5MB

const ProfessorFormSchema = z.object({
    Nome: z.string().nonempty("Nome é obrigatorio"),
    Email: z.string().email("Email mal formatado").nonempty("Email é obrigatorio"),
    Matricula : z.string().nonempty("Matricula é obrigatoria"),
    Confirme : z.string().nonempty("Por favor confirme sua senha"), 
    Curso: z.string().nonempty("Selecione seu curso"), 
    
    
    Senha: z.string().nonempty("Senha é obrigatoria").min(8, "Sua senha deve ter mais de 8 caracteres")
                .refine(e => /[A-Z]/.test(e), {message: "Sua senha deve conter ao menos uma letra maiuscula"})
                .refine(e => /[a-z]/.test(e), {message: "Sua senha deve conter ao menos uma letra minuscula"})
                .refine(e => /[0-1]/.test(e), {message: "Sua senha deve conter ao menos um caractere numerico"}),


    Foto : z.instanceof(FileList)
                .refine( file => file.length == 0 || [
                            "image/png", 
                            "image/jpeg",
                            "image/jpg"
                            ].includes(file[0].type), {message: "Tipo de arquivo invalido. Permitidos somente .jpeg e .png"})
                .refine(file => file.length == 0 || file[0].size <= fileSizeLimit, {message: "Tamanho do arquivo não pode superar 5MB"})}


).refine(({Confirme, Senha}) => Confirme == Senha, 
           {
            message: "Senhas estão diferentes", 
            path : ["Confirme"]
           }
        );

type ProfessorSchema = z.infer<typeof ProfessorFormSchema>;

export default function ProfessorForms() {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfessorSchema>({resolver: zodResolver(ProfessorFormSchema), mode: "onChange"});
    const [majors, setMajors] = useState<{ id: number, nome: string }[]>([]);

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

    const onSubmit = async (data: ProfessorSchema) => {
        console.log(data)
        
        const formData = new FormData();

        formData.append("name", data.Nome);
        formData.append("email", data.Email);
        formData.append("enrollment_number", data.Matricula);
        formData.append("password", data.Senha);
        formData.append("majorId", data.Curso);
        if (data.Foto.length > 0) {
            formData.append("picture", data.Foto[0]);
        }

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
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center items-center mt-[1rem]" encType="multipart/form-data">
                <div className="w-1/2 flex flex-col gap-[1.7rem]">
                    <InputFormField
                        errors={errors.Nome}
                        required
                        placeholder="Digite seu nome."
                        name="Nome"
                        type="text"
                        register={register('Nome')}
                    />
                    <InputFormField
                        errors={errors.Email}
                        required
                        placeholder="exemplo@uece.br"
                        name="Email"
                        type="email"
                        register={register("Email")}
                    />
                    <InputFormField
                        errors={errors.Matricula}
                        required
                        placeholder="Digite sua matrícula."
                        name="Matricula"
                        type="text"
                        register={register("Matricula")}
                    />
                    <InputFormField
                        errors={errors.Senha}
                        required
                        placeholder="Digite sua senha."
                        name="Senha"
                        type="password"
                        register={register("Senha")}
                    />
                    <InputFormField
                        errors={errors.Confirme}
                        required
                        placeholder="Confirme sua senha."
                        name="Confirme"
                        type="password"
                        register={register("Confirme")}
                    />
                    <DropDownFormField<number> 
                            name="Curso" 
                            errors={errors.Curso} 
                            register={register("Curso")} 
                            required 
                            options={majors.map<OptionsType<number>>(e=> {
                                                        return {label : e.nome, value: e.id} 
                                                    } 
                                                )
                                            } 
                    />
                    <InputFormField
                        type="file"
                        register={register("Foto")}
                        name="Foto"
                        errors={errors.Foto}
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
