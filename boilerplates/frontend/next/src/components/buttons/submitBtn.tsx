import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import Btn from './btn';

type T_Props = {
    className?: string;
    text?: string;
    children?: any;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const SubmitBtn = (props: T_Props) => {
    const { text = null, children = null, className = '' } = props;
    return (
        <Btn {...props} type='submit' className={`${className} w-max`}>
            {children || text}
        </Btn>
    )
}

export default SubmitBtn;