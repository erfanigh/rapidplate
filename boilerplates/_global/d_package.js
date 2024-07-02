//@ts-check
// package.json file
// this a dynamic file (started with `d_`) should be runned.

let base = {
    "type": "module",
    "dependencies": {
      "dotenv": "^16.3.1"
    },
    "devDependencies": {
      "@types/node": "^20.10.0"
    }
}

const configs = {
    frontend: {
        // TODO add css:build to all frontend project
        _global: {},
        next: {
            "scripts": {
                "client:dev": "cd client && npm run changeBaseurl && next dev",
                "client:build": "cd client && npm run changeBaseurl -- --nodeenv production && next build",
                "client:start": "cd client && npm run changeBaseurl -- --nodeenv production && next",
                "changeBaseurl": "node client/scripts/changeBaseurl.js",
                "css:build": "cd client && npx tailwindcss -i src/assets/styles/index.css -o src/assets/styles/tailwind.css -w"
            },
            "dependencies": {
                "@erfangharib/use-form-handler": "^1.0.1",
                "axios": "^1.6.8",
                "next": "^14.2.3",
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-icons": "^5.2.1",
                "yup": "^1.4.0",
                "zustand": "^4.5.2"
            },
            "devDependencies": {
                "@types/react": "^18.2.66",
                "@types/react-dom": "^18.2.22",
                "@typescript-eslint/eslint-plugin": "^7.2.0",
                "@typescript-eslint/parser": "^7.2.0",
                "eslint": "^8.57.0",
                "eslint-plugin-react-hooks": "^4.6.0",
                "eslint-plugin-react-refresh": "^0.4.6",
                "typescript": "^5.2.2"
            }
        },
        vue: {
            "scripts": {
                "client:start": "cd client && vite",
                "client:build": "npm run changeBaseurl -- --nodeenv production && cd client && vite build",
                "css:build": "cd client && npx tailwindcss -i src/assets/styles/index.css -o src/assets/styles/tailwind.css -w",
                "changeBaseurl": "node client/scripts/changeBaseurl.js"
            },
            "dependencies": {
                "axios": "^1.6.8",
                "dotenv": "^16.3.1",
                "oh-vue-icons": "^1.0.0-rc3",
                "pinia": "^2.1.7",
                "vue": "^3.4.21",
                "yup": "^1.4.0"
            },
            "devDependencies": {
                "@types/node": "^20.10.0",
                "@vitejs/plugin-vue": "^5.0.4",
                "typescript": "^5.2.2",
                "vite": "^5.2.0",
                "vue-tsc": "^2.0.6"
            }
        },
        react: {
            "scripts": {
                "client:start:w": "vite",
                "client:start": "vite preview",
                "client:build": "tsc && vite build",
                "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
            },
            "dependencies": {
                "zustand": "^4.5.2",
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-router-dom": "^6.23.0"
            },
            "devDependencies": {
                "@types/react": "^18.2.66",
                "@types/react-dom": "^18.2.22",
                "@typescript-eslint/eslint-plugin": "^7.2.0",
                "@typescript-eslint/parser": "^7.2.0",
                "@vitejs/plugin-react": "^4.2.1",
                "eslint": "^8.57.0",
                "eslint-plugin-react-hooks": "^4.6.0",
                "eslint-plugin-react-refresh": "^0.4.6",
                "typescript": "^5.2.2",
                "vite": "^5.2.0"
            }
        },
    },
    backend: {
        _global: {},
        express: {
            "scripts": {
                "api:start": "node dist/index",
                "api:build": "swc-build ./",
                "api:build:w": "swc-build --watch ./",
                "api:start:w": "nodemon --exec \"node dist/index\""
            },
            "dependencies": {
                "swc-build": "^1.0.0",
                "nodemon": "^3.1.3"
            },
        },
        adminjs: {
            "scripts": {
                "adminjs:build": "tsc",
                "adminjs:build:w": "swc-build --watch ./",
                "adminjs:start": "dotenv -c '.env' -- node dist/app",
                "lint": "eslint \"src\"",
            },
            "dependencies": {
                "swc-build": "^1.0.0",
                "adminjs": "^7.4.1",
                "@adminjs/express": "^6.1.0",
                "express": "^4.18.2",
                "express-formidable": "^1.2.0",
                "express-session": "^1.17.3",
                "@adminjs/sequelize": "^4.0.0",
                "sequelize": ">=6",
                "pg": "latest"
            },
            "devDependencies": {
                "@types/node": "^18.15.11",
                "@typescript-eslint/eslint-plugin": "^5.58.0",
                "@typescript-eslint/parser": "^5.58.0",
                "dotenv-cli": "^7.2.1",
                "eslint": "^8.38.0",
                "eslint-config-airbnb": "^19.0.4",
                "eslint-plugin-import": "^2.27.5",
                "eslint-plugin-jsx-a11y": "^6.7.1",
                "eslint-plugin-prettier": "^5.0.1",
                "eslint-plugin-react": "^7.32.2",
                "eslint-plugin-react-hooks": "^4.6.0",
                "prettier": "^3.1.0",
                "typescript": "^5.0.4",
                "@types/express": "^4.17.17",
                "tslib": "^2.5.0",
                "sequelize-cli": "^6.6.2"
            }
        },
    },
    'nodejs-app': {
        _global: {
            "scripts": {
                "build": "swc-build ./",
                "build:w": "swc-build --watch ./",
                "start": "dotenv -c '.env' -- node dist/src/index.js",
                "start:w": "set NODE_ENV=development&& nodemon dist/src/index.js"
            },
        }
    },
    'telegram-bot': {
        _global: {
            "scripts": {
                "bot:build": "swc-build ./",
                "bot:build:w": "swc-build --watch ./bot",
                "bot:start": "dotenv -c '.env' -- node dist/src/index.js",
                "bot:dev": "set NODE_ENV=development&& nodemon dist/src/index.js"
            },
            "dependencies": {
                "axios": "^1.6.2",
                "dotenv": "^16.3.1",
                "telegraf": "^4.15.3",
            },
            "devDependencies": {
                "@telegraf/types": "^7.1.0",
                "@types/node": "^20.10.0",
            }
        },
        'no-admin-panel': {},
        'with-admin-panel': {},
    }
}

const packageJson = (projectName, projectType, techName) => {
    const currentProjectType = configs[projectType];
    const currentProjectTech = currentProjectType?.[techName] ?? '';

    if(!currentProjectType)
        throw new Error(`no project type exist with name \`${projectType}\``);

    Object.assign(currentProjectType?.['_global'], currentProjectTech)
    Object.assign(base, currentProjectType?.['_global']);

    return {
        data: JSON.stringify(base, null, 4),
        fileType: '.json'
    }
}

export default packageJson;