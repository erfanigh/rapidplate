/** @ENTRY_POINT */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

config({ path: path.join(__dirname, '../', '.env') });

import('./server.js');