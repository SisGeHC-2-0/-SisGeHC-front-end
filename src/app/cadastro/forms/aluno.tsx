'use client'

import { FieldValues, useForm } from "react-hook-form"
import InputFormField from "../../../components/formComponents/inputFormField";
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
                Aluno     
            </div>


        </form>
    </div>
}

export {AlunoForms}