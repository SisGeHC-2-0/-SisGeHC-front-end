'use client'

import { FieldValues, useForm } from "react-hook-form"
import InputFormField from "./inputFormField";
import { Button } from "@/components/ui/button";
import { z } from "zod";


const AlunoFormData = z.object({
    name: z.string()
});

export default function AlunoForms () {
    const {register,
        handleSubmit,
        formState : {errors, isSubmitting},
    } = useForm();

    const onSubmit = (e : FieldValues)=> {
        return e;
    }

    errors.email
    return <div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] flex justify-center items-center">
            
            <div className="w-[50%] flex flex-col gap-[1.5rem]">                
                <InputFormField 
                    errors={errors} 
                    required 
                    placeholder="Digite sua senha." 
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
                    placeholder="Digite sua senha." 
                    name="Senha"
                    type="password"
                    register={register}
                />
                <InputFormField 
                    errors={errors} 
                    required 
                    placeholder="Confrime sua senha." 
                    name="Confime sua senha"
                    type="password"
                    register={register}
                />
                <Button
                    variant="default"
                    onClick={() =>
                        {}
                    }
                    className="h-[7vh] bg-green-700 font-bold text-md"
                    >
                        Criar conta
                </Button>
            </div>


        </form>
    </div>
}

export {AlunoForms}