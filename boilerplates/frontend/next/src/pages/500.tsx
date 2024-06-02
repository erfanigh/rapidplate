import Error from "../components/httpError";

const Page500 = () => (
    <Error errCode={500} errMsg='خطای سرور.' />
)

export default Page500;
