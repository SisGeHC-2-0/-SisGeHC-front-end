"use client"

import { useState, useEffect } from "react"
import Image, {ImageProps} from "next/image"

type FlbckImageProps = ImageProps & {
    fallbackText : string;
}

const FlbckImage = ({
    src,
    alt="",
    fallbackText,
    ...props
} : FlbckImageProps) => {

    const [error, setError] = useState(false);

    useEffect(()=>{
        setError(false);
    }, [src])


    return !error ?  <Image src={src} alt={alt} onError={()=>setError(true)} {...props}/> 
                     :
                     <h3>{fallbackText}</h3>


}

export default FlbckImage;