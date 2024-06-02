import '../assets/styles/tailwind.css';
import { ssrStore } from "../global/ssrStore";
import { setYupLocales } from '../utils/setYupLocales';

setYupLocales();

export default function App({ Component, pageProps }) {
    Object.assign(ssrStore, pageProps);
    return <Component {...pageProps} />;
}