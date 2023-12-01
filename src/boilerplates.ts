import { T_Cli } from "./cli.js";

type T_BoilerPlateObj = {
    path: `./${string}`;
    file: {
        name: string,
        content: string[]
    }
}

export const getBoilerplates = ({ authorName, projectName }: T_Cli) => {
    const b_gitignore: T_BoilerPlateObj = {
        path: './',
        file: {
            name: '.gitignore',
            content: [
                'node_modules',
                'dist',
                '.env'
            ]
        }
    };
    const b_env_d_ts: T_BoilerPlateObj = {
        path: './',
        file: {
            name: 'env.d.ts',
            content: [
                'declare global {',
                '  namespace NodeJS {',
                '    interface ProcessEnv {',
                '      NODE_ENV: string;',
                '    }',
                '  }',
                '}',
                '',
                'export { };',
            ]
        }
    };
    const b_dotenv: T_BoilerPlateObj = {
        path: './',
        file: {
            name: '.env',
            content: [
                'NODE_ENV=development',
            ]
        }
    };
    const b_index_ts: T_BoilerPlateObj = {
        path: './src',
        file: {
            name: 'index.ts',
            content: [
                `process.title = '${projectName}'`,
                'console.log(\'hello world\')',
            ]
        }
    };
    const b_readme_md: T_BoilerPlateObj = {
        path: './',
        file: {
            name: 'README.md',
            content: [
                `# ${projectName}`
            ]
        }
    };
    const b_run_js: T_BoilerPlateObj = {
        path: './',
        file: {
            name: 'run.js',
            content: [
                `import fs from "fs-extra";`,
                `import { spawn } from "child_process";`,
                `import path from "path";`,
                ``,
                `// run package.json scripts faster`,
                `const packageJsonPath = path.join(process.cwd(), 'package.json');`,
                `if (!fs.existsSync(packageJsonPath)) {`,
                `  console.error('package.json not found in the current directory.');`,
                `  process.exit(1);`,
                `}`,
                `try {`,
                `  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');`,
                `  const json = JSON.parse(packageJsonContent);`,
                `  if (json.scripts) {`,
                `    const scriptName = process.argv[2];`,
                `    if (json.scripts[scriptName]) {`,
                `      const scriptCommand = json.scripts[scriptName];`,
                `      const scriptArgs = process.argv.slice(3); // Extract script arguments`,
                `      const child = spawn(scriptCommand, scriptArgs, { stdio: 'inherit', shell: true });`,
                `      child.on('exit', (code) => {`,
                `        if (code !== 0) {`,
                `          process.exit(1);`,
                `        }`,
                `      });`,
                `    }`,
                `    else {`,
                `      console.error(\`Script '\${scriptName}' not found in package.json\`);`,
                `      process.exit(1);`,
                `    }`,
                `  }`,
                `  else {`,
                `    console.error("No 'scripts' section found in package.json");`,
                `    process.exit(1);`,
                `  }`,
                `} catch (err) {`,
                `   console.error('Error reading or parsing package.json:', err.message);`,
                `   process.exit(1);`,
                `}`
            ]
        }
    };
    const b_build_js: T_BoilerPlateObj = {
        path: './scripts',
        file: {
            name: 'build.js',
            content: [
                `import { join } from "path";`,
                `import fs from 'fs-extra'`,
                ``,
                `// build src dir into dist using swc`,
                `const addRootPath = (_path = '') => {`,
                `  if (_path === '' && !_path) throw 'no path specified on \`addRootPath\`';`,
                `  return join(process.cwd(), _path);`,
                '}',
                `const logError = (condition = false, message = '') => {`,
                `  if(condition) {`,
                `     console.error(message + '\\n');`,
                `     process.exit(1)`,
                `  }`,
                '}',
                `;(async () => {`,
                `  const isWatch = process.argv[2] === '--watch';`,
                `  const swcMainFilePath = addRootPath('node_modules/@swc/cli/bin/swc.js');`,
                `  const swcOpts = \`src -d dist \${isWatch ? '-w' : ''} --copy-files -C module.type=es6\`.split(' ');`,
                `  fs.removeSync(addRootPath('./dist'));`,
                `  logError(`,
                `     !fs.existsSync(addRootPath('src')),`,
                `     'No \`src\` folder exist at root level'`,
                `  )`,
                `  logError(`,
                `     !fs.existsSync(swcMainFilePath),`,
                `     'local SWC package not found. please install SWC and run script again. \\nnpm i -D @swc/cli @swc/core'`,
                `  )`,
                `  swcOpts.forEach((opt) => {`,
                `    process.argv.push(opt)`,
                `  });`,
                `  await import('../node_modules/@swc/cli/bin/swc.js');`,
                `})()`
            ]
        }
    };
    const b_tsconfig_json: T_BoilerPlateObj = {
        path: './',
        file: {
            name: 'tsconfig.json',
            content: [
                `{`,
                `  "compilerOptions": {`,
                `    "moduleResolution": "NodeNext",`,
                `    "module": "NodeNext",`,
                `    "declaration": true,`,
                `    "removeComments": true,`,
                `    "emitDecoratorMetadata": true,`,
                `    "experimentalDecorators": true,`,
                `    "allowSyntheticDefaultImports": true,`,
                `    "target": "ES6",`,
                `    "sourceMap": true,`,
                `    "outDir": "./dist",`,
                `    "rootDir": "./",`,
                `    "incremental": true,`,
                `    "skipLibCheck": true,`,
                `    "esModuleInterop": true,`,
                `    "strictNullChecks": false,`,
                `    "noImplicitAny": false,`,
                `    "strictBindCallApply": false,`,
                `    "forceConsistentCasingInFileNames": false,`,
                `    "noFallthroughCasesInSwitch": false`,
                `  }`,
                `}`,
            ]
        }
    };
    const b_package_json: T_BoilerPlateObj = {
        path: './',
        file: {
            name: 'package.json',
            content: [
                `{`,
                `  "name": "${projectName}",`,
                `  "version": "1.0.0",`,
                `  "description": "",`,
                `  "main": "src/index.ts",`,
                `  "type": "module",`,
                `  "scripts": {`,
                `    "start": "node dist/index",`,
                `    "build": "node scripts/build",`,
                `    "build:w": "node scripts/build --watch",`,
                `    "start:w": "nodemon --exec \\"node dist/index\\""`,
                `  },`,
                `  "keywords": [],`,
                `  "author": "${authorName}",`,
                `  "license": "ISC",`,
                `  "dependencies": {`,
                `    "dotenv": "^16.3.1",`,
                `    "fs-extra": "^11.1.1"`,
                `  },`,
                `  "devDependencies": {`,
                `    "@swc/cli": "^0.1.63",`,
                `    "@swc/core": "^1.3.99",`,
                `    "@types/node": "^20.10.0",`,
                `    "chokidar": "^3.5.3"`,
                `  }`,
                `}`
            ]
        },
    };
    
    const b_dirs: string[] = [
        'src',
        'scripts'
    ]
    const b_commands = [
        'git init',
        'git add .',
        'git commit -m "init project"'
    ]
    
    const b_files_arr = [
        b_dotenv,
        b_env_d_ts,
        b_gitignore,
        b_run_js,
        b_package_json,
        b_tsconfig_json,
        b_index_ts,
        b_build_js,
        b_readme_md
    ];

    return {
        b_files_arr,
        b_commands,
        b_dirs
    }
}
