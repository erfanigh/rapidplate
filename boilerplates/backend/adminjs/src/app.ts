import express from 'express';
import AdminJS from 'adminjs';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import path from 'path';
import { isTokenValid } from './middlewares/isTokenValid.js';
import { authRouter } from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { buildRouter } from '@adminjs/express';

export const admin = new AdminJS(options);

const port = process.env.PORT || 5000;
const routers = [
    authRouter
]
const setupRoutes = (app: ReturnType<typeof express>) => {
	const registeredRoutes = [];

	for (let index = 0; index < routers.length; index++) {
		const { baseRoute, routes } = routers[index];
		const router = express.Router();

		routes.forEach((val) => {
			router[val.method](
				val.route,
				...val.handlers
			)
	
			registeredRoutes.push({
				[val.method.toUpperCase()]: baseRoute + val.route
			})
		})

		app.use(baseRoute, router)
	}

	return registeredRoutes;
}

const start = async () => {
    await initializeDb();

    const app = express();

    if (process.env.NODE_ENV === 'production') {
        await admin.initialize();
    } else {
        admin.watch();
    }

	app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "./assets")));
	app.use(cookieParser());

    const registeredRoutes = setupRoutes(app)

    app.use(
        admin.options.rootPath, 
        isTokenValid({ 
            reversedAuthRoutes: ['/login'],
            disabledAuthRoutes: ['/frontend', '/favicon.ico'],
            invalidTokenCallback: (req, res) => {
                res.redirect('/auth/login')
            }
        }), 
        buildRouter(admin)
    );
    app.listen(port, () => {
        console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
        console.log(`Routes: `, registeredRoutes);
    });
};

start();
