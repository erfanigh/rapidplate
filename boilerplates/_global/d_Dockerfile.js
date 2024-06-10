//@ts-check
// Docker file config file
// this a dynamic file (started with `d_`) should be runned.

let base = [
    'FROM node:20.9.0',
    'WORKDIR .',
    'COPY package.json .',
    'RUN npm install',
    'COPY . .',

    'EXPOSE 5000',
    'CMD ["npm", "start"]'
]

const configs = {
    frontend: {
        _global: 'RUN npm run client:build',
        next: '',
        vue: '',
        react: '',
    },
    backend: {
        _global: '',
        express: 'RUN npm run api:build',
        adminjs: 'RUN npm run adminjs:build',
    },
    'telegram-bot': {
        _global: 'RUN npm run bot:build',
        'no-admin-panel': '',
        'with-admin-panel': '',
    }
}

const Dockerfile = (projectType, techName) => {
    const currentProjectType = configs[projectType];
    const currentProjectTech = currentProjectType?.[techName] ?? '';

    if(!currentProjectType)
        return;

    base.splice(5, 0, 
        [currentProjectTech, currentProjectType?.['_global']]
            .filter(val => val.trim() !== '')
            .join('\n\n')
    )

    return {
        data: base.join('\n\n'),
        fileType: null
    }
}

export default Dockerfile;