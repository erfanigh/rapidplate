# Node TS Boilerplate Generator

1. Clone repo
```
$ git clone https://github.com/erfanGharib/node-ts-boilerplate-generator.git
```

2. Change directory
```
$ cd ./node-ts-boilerplate-generator
```

3. Install project globaly
```
$ npm i && npm i -g
```

4. Run it in target dir and input ```projectName``` & ```authorName```
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