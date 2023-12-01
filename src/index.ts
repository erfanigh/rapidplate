#!/usr/bin/env node

import path from 'path';
import runCli from './cli.js';
import fs from 'fs';
import { generateBoilerplates } from './generate-boilerplates.js';

const packageName = 'node-ts-boilerplate-generator';

async function bootstrap() {
    process.title = packageName;

    const { authorName = 'author', projectName = 'sample-1' } = await runCli();
    const dirExist = Boolean(
        fs.existsSync(path.join(process.cwd(), projectName))
    );

    if(dirExist) {
        console.error(`\`${projectName}\` directory already exist!`);
        bootstrap();
        return;
    }

    fs.mkdirSync(projectName, { recursive: true })
    generateBoilerplates({ authorName, projectName});
}

bootstrap();