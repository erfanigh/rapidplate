import Head from "next/head";

const MainHead = ({
    title = '',
    description = null,
    robots = null
}) => {
    title = ' نام کمپانی | ' + title;

    return (
        <Head>
            <title>{title}</title>
            {robots && <meta name="robots" content={robots} />}
            {description && <meta name="description" content={description} />}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <meta
                name="format-detection"
                content="telephone=no, date=no, email=no, address=no"
            />
        </Head>
    )
};

export default MainHead;