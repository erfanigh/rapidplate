import AppId from "./appId";
import MainHead from "./mainHead";

interface T_Props {
    children: any;
    title: string,
    description?: string,
    robots?: "noindex,nofollow"
}

export const MainLayout: React.FC<T_Props> = ({ 
    children,
    title,
    description = null,
    robots = null
}): JSX.Element => {
    return (
        <>
            <MainHead title={title} description={description} robots={robots} />
            <main className="mx-auto flex max-w-[800px] w-full h-full md:w-[80%] flex-col items-center">
                {children}
            </main>
            <AppId/>
        </>
    )
};

export default MainLayout;