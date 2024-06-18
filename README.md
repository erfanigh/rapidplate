# Rapidplate
Generate TypeScript boilerplate project
- Supported project type:
    - Fullstack
    - Backend Only
        - Adminjs
        - Expressjs
    - Frontend Only
        - Nextjs
        - React (Vite)
        - Vue (Vite)
    - Simple Nodejs App
    - Telegram Bot (Telegraf.js)
- Fullstack projects are combination of Backend only and Frontend only projects
- Dockerfile included
- Tailwind config included on frontend projects
- Configured terminals based on project type. [more info](#terminal-keeper)

## Usage
1. Install package globaly
```
$ npm i -g @erfanigh/rapidplate
```

2. Run it in target dir and input informations
```
$ rapidplate
```

## Package.json scripts
Each project has its own scripts in package.json<br>
When a script ends with ```:w```, it means the script is in watch mode.<br><br>
For faster build process **( TypeScript -> Javascript )** we use [@erfanigh/swc-build](https://github.com/erfanigh/swc-build) package on projects except those that have their own compiler like Reactjs

### Build
build script ends with ```:build```<br>
these script also can run in watch mode
- ```client:build```
- ```api:build```
- ```adminjs:build```
- ```bot:build```

### Start
start script ends with ```:start```<br>
these script also can run in watch mode
- ```client:start```
- ```api:start```
- ```adminjs:start```
- ```bot:start```

## Terminal Keeper
You can use benefits of [Terminal Keeper Vscode Extention](https://marketplace.visualstudio.com/items?itemName=nguyenngoclong.terminal-keeper)
- Terminal Keeper config file (.vscode/sessions.json) is included