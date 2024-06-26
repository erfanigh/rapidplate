import { RefObject } from "react";

interface T_Props {
    className?: string;
    children?: any;
    title?: string;
    ico?: JSX.Element;
    onClick?: any;
    type?: any;
    name?: string;
    style?: any;
    disabled?: boolean;
    btnRef?: RefObject<HTMLButtonElement>
}
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