//@ts-check
// terminal keeper vscode ext config file
// this a dynamic file (started with `d_`) should be runned.

const base = {
    "$schema": "https://cdn.statically.io/gh/nguyenngoclongdev/cdn/main/schema/v10/terminal-keeper.json",
    "theme": "tribe",
    "active": "default",
    "activateOnStartup": true,
    "keepExistingTerminals": false,
    "sessions": {
        "default": [
            {
                "name": "Terminal",
                "autoExecuteCommands": false,
                "icon": "terminal",
                "color": "terminal.ansiBrightBlack",
                "commands": [ "" ]
            }
        ]
    }
}

const terminals = {
    frontend: {
        next: [],
        vue: [],
        react: [],
        _global: [
            {
                "name": "client:dev",
                "icon": "zap",
                "color": "terminal.ansiYellow",
                "commands": [
                    "npm run client:dev"
                ]
            },
            {
                "name": "css:build",
                "icon": "debug-stackframe-focused",
                "color": "terminal.ansiBrightBlack",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run css:build"
                ]
            }
        ]
    },
    backend: {
        _global: [],
        express: [
            {
                "name": "api:start:w",
                "icon": "zap",
                "color": "terminal.ansiYellow",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run api:start:w"
                ]
            },
            {
                "name": "api:build:w",
                "icon": "debug-stackframe-focused",
                "color": "terminal.ansiBrightBlack",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run api:build:w"
                ]
            },
        ]
    },
    'nodejs-app': {
        _global: [
            {
                "name": "start:w",
                "icon": "zap",
                "color": "terminal.ansiYellow",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run start:w"
                ]
            },
            {
                "name": "build:w",
                "icon": "debug-stackframe-focused",
                "color": "terminal.ansiBrightBlack",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run build:w"
                ]
            },
        ]
    },
    'telegram-bot': {
        _global: [
            {
                "name": "start:w",
                "icon": "zap",
                "color": "terminal.ansiYellow",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run start:w"
                ]
            },
            {
                "name": "build:w",
                "icon": "debug-stackframe-focused",
                "color": "terminal.ansiBrightBlack",
                "autoExecuteCommands": false,
                "commands": [
                    "npm run build:w"
                ]
            },
        ]
    }
}

const sessions = (projectType, techName) => {
    const currentProjectType = terminals[projectType];
    const currentProjectTech = currentProjectType?.[techName] ?? [];

    if(!currentProjectType)
        throw new Error(`no project type exist with name \`${projectType}\``);

    Object.assign(base, currentProjectTech);
    base.sessions.default = [
        ...base.sessions.default, 
        ...currentProjectTech,
        ...currentProjectType?.['_global'],
    ];

    return {
        data: JSON.stringify(base, null, 4),
        fileType: '.json'
    }
}

export default sessions;