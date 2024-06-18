import { ComponentLoader } from 'adminjs';
import path from 'path';

const componentLoader = new ComponentLoader();

componentLoader.override('Login', path.resolve(global.__dirname, './admin/components/login.js'));

const Components = {
    Dashboard: componentLoader.add('Dashboard', path.resolve(global.__dirname, './admin/components/dashboard.js')),
}

export { componentLoader, Components }
