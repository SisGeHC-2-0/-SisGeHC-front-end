import { MdOutlineErrorOutline } from "react-icons/md";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export default function InputFormField(
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
                                            register : UseFormRegister<FieldValues>,
                                            errors : FieldErrors<FieldValues>
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

                errors[name] ? 
                <span className="text-red-500 ml-auto flex flex-row items-center justify-center">   
                <MdOutlineErrorOutline/> 
                    {`${errors[name].message}`}
                </span> : <></>

            }
        </div>
        <input 
            type={type} 
            {...register(name)} 
            placeholder={placeholder} 
            className="outline-none rounded-md border-solid border-[1px] border-gray-300 py-[1rem] px-[1rem] w-[100%]"
        />
    </div>
}