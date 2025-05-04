import { MdOutlineErrorOutline } from "react-icons/md";
import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from "react-hook-form";
import { HtmlProps } from "next/dist/shared/lib/html-context.shared-runtime";
import { HTMLProps } from "react";

export default function InputFormField<T extends FieldValues>(
                                        {
                                            name, 
                                            type, 
                                            register, 
                                            errors, 
                                            placeholder = "...",
                                            required = false
                                        }:
                                        {
                                            name : string, 
                                            type : string, 
                                            placeholder? : string, 
                                            required? : boolean, 
                                            register : HTMLProps<HTMLInputElement>,
                                            errors : FieldError | undefined | Merge<FieldError, FieldErrorsImpl<any>>
                                        }
                                    )
{
    
    return <div>
        <div className="flex flex-row align-between">
            <span className="font-bold text-green-700">
                {required ? < span className="text-gray-500">*</span> : <></>} 
                {name}:
            </span> 
            {/* <span className="ml-[100%]"></span> */}
            {

                errors ? 
                <span className="text-red-500 ml-auto flex flex-row items-center justify-center">   
                <MdOutlineErrorOutline/> 
                    {`${errors.message}`}
                </span> : <></>

            }
        </div>
        <input 
            type={type} 
            {...register} 
            placeholder={placeholder} 
            className={type != "file"? "outline-none rounded-md border-solid border-[1px] border-gray-300 p-[1rem] w-[100%]" : "w-full"}
/>
    </div>
}