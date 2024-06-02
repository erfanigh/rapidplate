import Link from "next/link";
import MainLayout from "./mainLayout";

interface T_Props {
    errCode: number;
    errMsg: string;
}

const Error = ({ errCode, errMsg }: T_Props) => {
    return (
        <MainLayout title='404 پیدا نشد'>
            <div className="f-center flex-col my-auto w-full h-full">
                <h1 className="text-8xl mb-1 font-bold">{errCode}</h1>
                <p>
                    <span>{errMsg}</span>
                    <Link className="mr-[5px] link" href='/'>صفحه اصلی</Link>
                </p>
            </div>
        </MainLayout>
    )
}

export default Error;