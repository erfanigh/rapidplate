import { ButtonHTMLAttributes, DetailedHTMLProps, RefObject } from "react";

type T_Props = {
    children?: any;
    title?: string;
    ico?: JSX.Element;
    btnRef?: RefObject<HTMLButtonElement>
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
const Btn = (props: T_Props) => {
    return (
        <button
            {...props}
            type={props.type ?? "button"}
            ref={props.btnRef}
            className={`px-2 py-3 capitalize text-lg rounded-xl transition-all outline-none f-center-between ${props.className}`}
        >
            {props.ico}
            {props.children}
        </button>
    )
}
export default Btn