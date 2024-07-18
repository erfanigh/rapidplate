//@ts-check
// package.json file
// this a dynamic file (started with `d_`) should be runned.
import fs from 'fs';
import path from 'path';

let swcPackageList = [
    "@swc/cli",
    "@swc/core",
    "chokidar",
]

let dependencies = {
    next: {
        "dependencies": [
            "@erfanigh/use-form-handler",
            "axios",
            "next",
            "react",
            "react-dom",
            "react-icons",
            "yup",
            "zustand",
            "commander"
        ],
        "devDependencies": [
            "@types/react",
            "@types/react-dom",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "eslint",
            "eslint-plugin-react-hooks",
            "eslint-plugin-react-refresh",
            "typescript",
        ]
    }, 
    vue: {
        "dependencies": [
            "axios",
            "oh-vue-icons",
            "pinia",
            "vue",
            "yup",
        ],
        "devDependencies": [
            "@vitejs/plugin-vue",
            "typescript",
            "vite",
            "vue-tsc",
        ]
    },
    react: {
        "dependencies": [
            "zustand",
            "react",
            "react-dom",
            "react-router-dom",
        ],
        "devDependencies": [
            "@types/react",
            "@types/react-dom",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "@vitejs/plugin-react",
            "eslint",
            "eslint-plugin-react-hooks",
            "eslint-plugin-react-refresh",
            "typescript",
            "vite",
        ]
    },
    express: {
        "dependencies": [
            "cookie-parser",
            "express",
            "morgan",
            "cors",
            "jsonwebtoken",
            "http-status-codes",
            "formidable",
            "yup",
            "drizzle-orm",
            "md5",
            "postgres",
            ...swcPackageList
        ],
        "devDependencies": [
            "nodemon",
            "@types/express",
            "@types/formidable",
        ]
    },
    adminjs: {
        "dependencies": [
            "adminjs",
            "@adminjs/express",
            "express",
            "express-formidable",
            "express-session",
            "@adminjs/sequelize",
            "sequelize",
            "pg",
            ...swcPackageList
        ],
        "devDependencies": [
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "dotenv-cli",
            "eslint",
            "eslint-config-airbnb",
            "eslint-plugin-import",
            "eslint-plugin-jsx-a11y",
            "eslint-plugin-prettier",
            "eslint-plugin-react",
            "eslint-plugin-react-hooks",
            "prettier",
            "typescript",
            "@types/express",
            "tslib",
            "sequelize-cli",
        ]
    },
    "telegram-bot": {
        "dependencies": [
            "axios",
            "telegraf",
        ],
        "devDependencies": [
            "@telegraf/types",
        ]
    }, 
    base: {
        "dependencies": [
            "dotenv"
        ],
        "devDependencies": [
            "@types/node"
        ]
    }
}

const configs = {
    frontend: {
        // TODO add css:build to all frontend project
        _global: async () => ({
            "scripts": {
                "changeBaseurl": "node client/scripts/changeBaseurl.js",
                "css:build": "npx tailwindcss -i src/assets/styles/index.css -o src/assets/styles/tailwind.css -w"
            },
        }),
        next: async () => ({
            "scripts": {
                "client:dev": "npm run changeBaseurl && next dev",
                "client:build": "npm run changeBaseurl -- --nodeenv production && next build",
                "client:start": "npm run changeBaseurl -- --nodeenv production && next",
            },
            "dependencies": await configDependencies("next"),
            "devDependencies": await configDependencies("next", true)
        }),
        vue: async () => ({
            "scripts": {
                "client:start": "cd client && vite",
                "client:build": "npm run changeBaseurl -- --nodeenv production && cd client && vite build",
                "css:build": "cd client && npx tailwindcss -i src/assets/styles/index.css -o src/assets/styles/tailwind.css -w",
                "changeBaseurl": "node client/scripts/changeBaseurl.js"
            },
            "dependencies": await configDependencies("vue"),
            "devDependencies": await configDependencies("vue", true),
        }),
        react: async () => ({
            "scripts": {
                "client:start:w": "vite",
                "client:start": "vite preview",
                "client:build": "tsc && vite build",
                "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
            },
            "dependencies": await configDependencies("react"),
            "devDependencies": await configDependencies("react", true),
        }),
    },
    backend: {
        _global: async () => ({}),
        express: async () => ({
            "scripts": {
                "api:start": "node dist/src/index",
                "api:build": "swc src -d dist ./",
                "api:build:w": "swc src -d dist -w ./",
                "api:start:w": "nodemon --exec \"node dist/src/index\""
            },
            "dependencies": await configDependencies("express"),
            "devDependencies": await configDependencies("express", true),
        }),
        adminjs: async () => ({
            "scripts": {
                "adminjs:build": "swc src -d dist ./",
                "adminjs:build:w": "swc src -d dist -w ./",
                "adminjs:start": "dotenv -c '.env' -- node dist/app",
                "lint": "eslint \"src\"",
            },
            "dependencies": await configDependencies("adminjs"),
            "devDependencies": await configDependencies("adminjs", true),
        }),
    },
    'nodejs-app': {
        _global: async () => ({
            "scripts": {
                "build": "swc src -d dist ./",
                "build:w": "swc src -d dist -w ./",
                "start": "dotenv -c '.env' -- node dist/src/index.js",
                "start:w": "set NODE_ENV=development&& nodemon dist/src/index.js"
            },
        })
    },
    'telegram-bot': {
        _global: async () => ({
            "scripts": {
                "bot:build": "swc src -d dist ./",
                "bot:build:w": "swc src -d dist -w ./bot",
                "bot:start": "dotenv -c '.env' -- node dist/src/index.js",
                "bot:dev": "set NODE_ENV=development&& nodemon dist/src/index.js"
            },
            "dependencies": await configDependencies("telegram-bot"),
            "devDependencies": await configDependencies("telegram-bot", true),
        }),
        'no-admin-panel': {},
        'with-admin-panel': {},
    }
}

const getAlreadyCreatedPackageJson = (projectName) => {
    try {
        return JSON.parse(
            fs.readFileSync(
                path.join(process.cwd(), projectName, 'package.json')
            )
        );
    } 
    catch(err) {
        return null;
    }
}

// get packages list and fetch latest version number of package
const configDependencies = async (name, isDev = false) => {
    const dependencyMode = isDev ? "devDependencies" : "dependencies";
    const currentTechDependencies = dependencies[name];
    let result = {};

    if(!currentTechDependencies)
        throw new Error(`invalid tech name: ${name}`);

    for (let index = 0; index < currentTechDependencies[dependencyMode].length; index++) {
        const element = currentTechDependencies[dependencyMode][index];
        const data = (await fetch(`https://registry.npmjs.org/${element}/latest`)).json();
        const version = '^' + (await data)?.version;
    
        result[element] = version;
    }

    return result;
}

function deepMerge(target, source) {
    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            target[key] = target[key] ?? {};

            if(typeof source[key] === 'object') 
                Object.assign(target[key], source[key]);
            else 
                target[key] = source[key]
        }
    }
}

const packageJson = async (projectName, projectType, techName) => {
    const currentProjectType = configs[projectType];
    const currentProjectTech = await currentProjectType?.[techName]() ?? {};

    if(!currentProjectType)
        throw new Error(`no project type exist with name \`${projectType}\``);

    let base = getAlreadyCreatedPackageJson(projectName) ?? {
        "name": projectName,
        "type": "module",
    }

    deepMerge(currentProjectTech, await currentProjectType?.['_global']())
    deepMerge(base, currentProjectTech);
    deepMerge(base, {
        "dependencies": await configDependencies("base"),
        "devDependencies": await configDependencies("base", true)
    });

    return {
        data: JSON.stringify(base, null, 4),
        fileType: '.json'
    }
}

export default packageJson;