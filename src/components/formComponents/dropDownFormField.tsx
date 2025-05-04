import { Dispatch, HTMLProps, SetStateAction } from "react";
import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from "react-hook-form";
import { MdOutlineErrorOutline } from "react-icons/md";

export type OptionsType<T> = {
    label : string,
    value : T
}

export default function DropDownFormField<T extends string | number | readonly string[]>(
    {
        name, 
        register, 
        errors, 
        required = false,
        options  
    }:
    {
        name : string, 
        required? : boolean, 
        register : HTMLProps<HTMLSelectElement>,
        errors : FieldError | undefined | Merge<FieldError, FieldErrorsImpl<any>>,
        options : OptionsType<T>[] 
    }

)
{


    return <div>
            <div className="flex flex-row align-between">
                <span className="font-bold text-green-700">
                    {required ? < span className="text-gray-500">*</span> : <></>} 
                    {name}:
                </span> 
                {
                    errors ? 
                    <span className="text-red-500 ml-auto flex flex-row items-center justify-center">   
                    <MdOutlineErrorOutline/> 
                        {`${errors.message}`}
                    </span> : <></>
                }
            </div>

            <select
                id="curso"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-[1rem]"
                
                {...register}
            >
                {
                    ! required ? 
                    <option value={undefined}>---</option>
                    :
                    <></> 
                }

                {
                    options.map((e, i) =>
                        <option value={e.value} key={i}>{e.label}</option>
                    )
                }
        </select>
    </div>

}
