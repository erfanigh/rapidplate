# Node TS Boilerplate Generator

1. Install project globaly:
   ```
   $ cd ./node-ts-boilerplate-generator
   $ npm i -g
   ```
   
2. Run it in target dir and input ```projectName``` & ```authorName```
   ```
   $ boil-gen
   ```

## Run Generated Project
for faster build process **( ts -> js )** we use [swc](https://github.com/swc-project) here<br>
running package.json scripts faster using ```run.js``` script

1. Build **./src** dir into **./dist**
   ```
   $ node run build 
   $ node run build:w // watch mode
   ```

2. Run project
   ```
   $ node run start
   $ node run start:w // watch mode
   ```