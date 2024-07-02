import { BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages';
import NoPage from './pages/404';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="/" element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;