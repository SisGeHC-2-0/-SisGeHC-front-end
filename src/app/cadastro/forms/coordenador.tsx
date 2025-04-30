'use client'

import { FieldValues, useForm } from "react-hook-form"
import InputFormField from "./inputFormField";

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
            </div>


        </form>
    </div>
}

export {CoordenadorForms}