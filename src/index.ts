#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { BOILERPLATE_DIR_NAME, packageName } from './global.js';
import { performCommands } from './actions/performCommands.js';
import { generateBoilerplates } from './actions/generateBoilerplates.js';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

process.title = packageName;

export const boilerplatesDirPath = path.join(__dirname, '..', BOILERPLATE_DIR_NAME)

async function bootstrap() {
    const runCli = (await import('./cli.js')).default;
    const cliInputs = await runCli();

    console.log('\nGenerating Project..');

    await generateBoilerplates(cliInputs);
    await performCommands(cliInputs.mainQuestions.projectName);

    console.log('\nProject generated successfully');
}

bootstrap();