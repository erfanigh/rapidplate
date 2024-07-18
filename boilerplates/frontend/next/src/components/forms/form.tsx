import { T_Send } from "@erfanigh/use-form-handler";
import Link from "next/link";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import SubmitBtn from "../buttons/submitBtn";
import Err from "../err";
import { FaSpinner } from "react-icons/fa";

export const inputsAcceptedTypes = ['password', 'email', 'text']

export interface T_FormProps {
    send: T_Send;
    inputs: Array<
        | (InputHTMLAttributes<HTMLInputElement> & { type: 'email' | 'password' | 'text' })
        | (TextareaHTMLAttributes<HTMLTextAreaElement> & { type: 'textarea' })
    >;
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
    isLoading: boolean
}

const Form = ({ submitButton, send, isLoading, inputs, title, alternativePage, image, id, className = '' }: T_FormProps) => {
    return (
        <div className={`f-start-start w-full flex-col ${className}`}>
            {
                title &&
                <h1 className='capitalize text-4xl font-bold mb-6'>
                    {title}
                </h1>
            }
            <form
                onSubmit={send}
                id={id}
                className='flex flex-col w-full gap-y-1.5'
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
                            {!props.hidden && <Err />}
                        </React.Fragment>
                    ))
                }
                {
                    submitButton 
                    ? submitButton
                    : <SubmitBtn 
                        className='!f-center btn-secondary !w-full mt-2' 
                    >
                        {
                            isLoading 
                            ? <FaSpinner className='animate-spin' />
                            : title ?? 'ثبت'
                        }
                    </SubmitBtn>
                }
            </form>

            { 
                alternativePage &&
                <div className="flex text-base ml-auto mt-3">
                    <span className="mr-1 opacity-40">
                        {alternativePage.text}
                    </span>

                    <Link className="underline opacity-80 capitalize" href={alternativePage.link}>
                        {alternativePage.linkTitle}
                    </Link>
                </div>
            }
        </div>
    );
}

export default Form;