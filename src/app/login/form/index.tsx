'use client'

import InputFormField from "@/components/formComponents/inputFormField";
// import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const LoginFormSchema = z.object({
    email: z.string().email("Email mal formatado").nonempty("Email é obrigatorio"),
    senha : z.string().min(8, "Senha deve ter mais de ")
})

type LoginSchema = z.infer<typeof LoginFormSchema>

export default function LoginForm()
{

    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<LoginSchema>({resolver: zodResolver(LoginFormSchema) , mode: "onChange"});

    const onSubmit = (data : LoginSchema) => {
        

        data.email

    }

    return <div className="w-1/2 mt-[1rem]">
        <form className="w-full flex flex-col gap-[1.7rem] " onSubmit={handleSubmit(onSubmit)}>
            <InputFormField
                name="Email"
                errors={errors.email}
                register={register('email')}
                placeholder="exemplo@uece.br"
                type="text"
            />

            <InputFormField
                name="Senha"
                errors={undefined}
                register={register('senha')}
                placeholder="Digite sua senha."
                type="password"
            />

            <span className="w-full text-center">
                <Link href="/login/recuperar-senha" className="cursor-pointer text-blue-500">
                    Esqueceu sua senha?

                </Link>
            </span>

            <Button
                disabled={!isValid}
                type="submit"
                variant="default"
                className="h-[7vh] bg-green-700 font-bold text-md"
            >
                Entrar
            </Button>
        </form>
    </div>


}