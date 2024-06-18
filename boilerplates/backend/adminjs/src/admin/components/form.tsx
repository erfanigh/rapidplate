import { T_Send } from "@erfangharib/use-form-handler";
import React from "react";
import SubmitBtn from "./buttons/submitBtn";
import Err from "./err";

export const inputsAcceptedTypes = ['password', 'email', 'text']

interface T_Props {
    send: T_Send;
    inputs: Array<{
        name: string;
        type?: string,
        placeholder?: string;
        defaultValue?: string;
    }>;
    className?: string;
    title?: string;
    alternativePage?: {
        text: string
        link: string;
        linkTitle: string
    }
    image?: string;
    id?: string;
    submitButton?: any
}

const Form = ({ submitButton, send, inputs, title, alternativePage, image, id, className = '' }: T_Props) => {
    return (
        <div dir="rtl" className={`f-start-start w-full flex-col ${className}`}>
            {
                title &&
                <h1 className='capitalize text-4xl font-bold mb-6'>
                    {title}
                </h1>
            }
            <form
                onSubmit={send}
                id={id}
                className='flex flex-col w-full gap-y-2'
            >
                {
                    inputs.map((props, index) => (
                        <React.Fragment key={index}>
                            {
                                props.type === 'textarea' ? 
                                <textarea {...props}></textarea> :
                                <input
                                    {...props}
                                    type={props.type ?? 'text'}
                                />
                            }
                            <Err />
                        </React.Fragment>
                    ))
                }
                {
                    submitButton 
                    ? submitButton
                    : <SubmitBtn className='!f-center btn-secondary !w-full mt-3' text={title ?? 'ثبت'} />
                }
            </form>
        </div>
    );
}

export default Form;