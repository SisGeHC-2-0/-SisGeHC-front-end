import { HTMLProps } from "react"


const CorePanel = (props : HTMLProps<HTMLDivElement>) => {

    let { className, ...rest } = props;

    if (className === null )
        className = "";

    return (
        <div 
        className={ "bg-white rounded-xl shadow-l " + className }
        {...rest}>
            {props.children}
        </div>
    )
}

export {CorePanel}