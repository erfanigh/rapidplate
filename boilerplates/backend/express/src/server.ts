import { validateToken } from './middlewares/validateToken.js';
import { createHttpError } from './utils/createHttpError.js';
import { domain, uploadsDirPath } from './global.js';
import { T_RequestHandler } from './types/T_Router.js';
import { authRouter } from './routes/auth/auth.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fs from "fs";

const port = process.env.PORT || 5000;
const app = express();
const corsConfig = {
	credentials: true,
	origin: domain
}
const routers = [
	authRouter,
]

const setupRoutes = () => {
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
const handle404: T_RequestHandler = (req, res, next) => {
	res.status(404).send(createHttpError(404));
}
const handleErrors: T_RequestHandler = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.send(err);
}
const checkUploadsDirExistence = () => {
	if(!fs.existsSync(uploadsDirPath))
		fs.mkdirSync(uploadsDirPath, { recursive: true })
}

export const bootstrapServer = async () => {
	app.use(morgan('dev'));
	app.use(cors(corsConfig));
	app.use(express.json());
	app.use('/uploads', express.static(uploadsDirPath));
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(validateToken({
		reversedAuthRoutes: ['/auth/login']
	}));
	
	checkUploadsDirExistence();
	const registeredRoutes = setupRoutes();

	app.use(handleErrors);
	app.use(handle404);

	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}/`);
		console.log('Cors:', corsConfig);
		console.log('Routes:', registeredRoutes);
	});
}
