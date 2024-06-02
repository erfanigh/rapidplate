import Error from "../components/httpError";

const Page404 = () => (
    <Error errCode={404} errMsg='صفحه مورد نظر پیدا نشد.' />
)

export default Page404;
