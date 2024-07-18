import fs from 'fs';
import program from 'commander';
import dotenv from 'dotenv';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

function writeBaseurl(filepath, nodeenv) {
    let baseurl;

    switch (nodeenv) {
        case 'production':
            baseurl = /* ENTER REMOTE URL ENDPOINT */;
            break;

        case 'development':
            baseurl = /* ENTER LOCAL URL ENDPOINT */;
            break;

        default:
            console.error("Invalid node environment. Please provide either 'production' or 'development'.");
            return;
    }

    const fileData = `export const baseurl = "${baseurl}";`;

    fs.writeFile(filepath, fileData, 'utf8', (err) => {
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

writeBaseurl(
    filepath, 
    args.nodeenv ?? process.env.NODE_ENV ?? 'development'
);