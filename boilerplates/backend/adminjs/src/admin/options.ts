import { AdminJSOptions } from 'adminjs';
import { Components, componentLoader } from './component-loader.js';
import { AdminUsers } from '../db/models/AdminUsers.js';
import md5 from 'md5';
import { UniqueConstraintError, ValidationError } from 'sequelize';

const catchSequelizeErrors = async <T>(fn: () => Promise<T>): Promise<T | ValidationError | Omit<UniqueConstraintError, 'original' | 'fields' | 'sql' | 'get' | 'message'>> => {
  try {
    return await fn()
  }
  catch (err) {
    return {
      name: err.name,
      errors: err?.errors,
      parent: err?.parent
    };
  }
}

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/',
  branding: {
    withMadeWithLove: false,
    logo: '/images/logo.jpg',  // URL to your logo
    companyName: 'Admin Panel Title | عنوان پنل ادمین',
    favicon: '/images/logo.jpg',  // URL to your favicon (optional)
  },
  resources: [
    {
      resource: AdminUsers,
      properties: {
        password: {
          isVisible: {
            list: false, edit: true, filter: false, show: false
          },
        }
      },
      options: {
        editProperties: ['name', 'email', 'password'],
        showProperties: ['name', 'email', 'password'],
        actions: {
          new: {
            before: () => console.log('before new action')
          },
          edit: {
            before: () => console.log('before edit action')
          },
        }
      }
    },
  ],
  dashboard: {
    component: Components.Dashboard
  },
  assets: {
    styles: ["/styles/tailwind.css"],
  },
  databases: [],
}

export default options;
