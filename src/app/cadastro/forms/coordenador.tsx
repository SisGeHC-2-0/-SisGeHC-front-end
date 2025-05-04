'use client'

import InputFormField from "@/components/formComponents/inputFormField";
import { FieldValues, useForm } from "react-hook-form"


export default function CoordenadorForms () {
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
                Coordenador 
            </div>


        </form>
    </div>
}

export {CoordenadorForms}