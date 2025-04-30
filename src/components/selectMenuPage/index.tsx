'use client'

import { JSX, useState } from "react";
import { z } from 'zod';

export interface Empty {};

export interface PageType {
    name : string,
    content : JSX.Element
} ;

const SelectMenuPage = (
                        { pages, defaultValue = 0 } : 
                        {pages : PageType[], defaultValue? : number }
                       ) => {
    const [pageIndex, setPageIndex] = useState(defaultValue)

    return(
        <div>
            <div className="flex flex-row w-[100%] justify-around overflow-hiden">
            {
                pages.map((e, index)=>
                    <a key={index} onClick={e => setPageIndex(index)} className="cursor-pointer w-[100%] text-center">
                        <div >
                            <div className={ 
                                "w-[70%] ml-[15%] h-[4px] rounded-xl" + 
                                (index == pageIndex ? " bg-green-700" : "")
                                }></div>

                                {e.name}
                        </div>
                    </a>
                )
            }
            </div>
            { 
                pageIndex >= 0 && pageIndex < pages.length ? 
                pages[pageIndex].content :
                <></>
            }
        </div>
    );
}


export {SelectMenuPage};
