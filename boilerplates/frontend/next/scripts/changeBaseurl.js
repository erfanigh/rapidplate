import fs from 'fs';
import program from 'commander';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

function writeBaseurl(filepath, nodeenv = process.env.NODE_ENV ?? 'development') {
    let baseurl;

    if (nodeenv === 'production') {
        baseurl = 'https://example.com';
    } else if (nodeenv === 'development') {
        baseurl = 'http://localhost:5000';
    } else {
        console.error("Invalid node environment. Please provide either 'production' or 'development'.");
        return;
    }

    fs.writeFile(filepath, `export const baseurl = "${baseurl}";`, 'utf8', (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log(
                "baseurl changed successfully!\n",
                `nodeenv: ${nodeenv}\n`,
                `baseurl: ${baseurl}\n`,
            );
        }
    });
}

program
    .option('-e, --nodeenv <nodeenv>', 'Node environment (production/development)')
    .parse(process.argv);

const args = program.opts();
const filepath = path.join(__dirname, '../src/global', 'baseurl.ts');

writeBaseurl(filepath, args.nodeenv);