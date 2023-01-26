# Watch mode (compiling a single file)
we can tell TS to watch a file, and whenever this file changes, TS will recompile.

>>> tsc app.ts --watch
or
>>> tswc app.ts -w

# Compiling multiple files / the entire project
Navigate to your project folder, in the terminal then run
>>> tsc --init
This will initialize the project as a tsc project and therefore everything that it is inside this folder is important

the tsc --init command creates a tsconfig.json file --> this is basically the indicator for TS that the project in which this file lies, and all subfolders, should be managed by TS.
Now we car simply run
>>> tsc
and this will tell typescript to compile all TS files that can find in this project
you can then also run
>>> tsc -w
to enter the watch mode for all ts files

# tsconfig.json
info on tsconfig.json --> https://www.typescriptlang.org/docs/handbook/tsconfig-json.html --> https://www.typescriptlang.org/docs/handbook/compiler-options.html

NB the **tsconfig.json** is very important because it tells JS how it should compile these files.

### tsconfig.json --> "exclude"
at the end, you can set an "exclude" option
"exclude": [
    "*.dev.ts",
    "node_modules"
]
this indicates that you do not want to compile any ts files inside the node_modules folder
NB node_modules is automatically excluded as a default setting, no need to specify the exclude

### tsconfig.json --> "include"
"include": []
does the opposite

### tsconfig.json --> "files"
"files": []
like "include" but with "files" you cannot specify folders, only files

### tsconfig.json --> compilerOptions --> "target"
**compilerOptions**: setting a compilation target
compilerOptions allows us to control how our TS code is compiled (how the files that are compiled are treated by TS)
"target": "es5" --> here you tell TS for which target JS version you want to compile the code

### tsconfig.json --> compilerOptions --> "module"
**Typescript core libraries**
"module": "commonjs" --> we will see this later, when we learn how to connect multiple files

### tsconfig.json --> compilerOptions --> "lib"
"lib" --> lib is an option that allows you to specify which default objects and features TS knows
NB if the lib option is not set, then somw defaults are assumed --> these defaults depend on your JS target (e.g. if target is es6, then by default it includes all the features that are globally available in es6)
"lib": [
    "dom",
    "es6",
    "dom.iterable",
    "scripthost"
] //NB this is the default if you do not define lib and the target is es6
"dom" unlocks all the DOM APIs in TS

### tsconfig.json --> compilerOptions --> "allowJs" and "checkJs"
with "allowJs" and "checkJs" you can also include JS files in the compilation
- with allowJs a JS file will be compiled by TS (even if it does not end with ts)
- with checkJS it will not compile it but it will still check the syntax and report potential errors
this could be nice if you do not want to use TS but you want to take advantage of some of its features

### tsconfig.json --> compilerOptions --> "sourceMap"
**sourceMap** helps us with debugging and development
if sourceMap is set to false, then in the browser (developer tools --> Sources) you see the compiled js files, not the ts files. but if you are working on a ts project, for debugging it would be better to have ts files.
set
"sourceMap": true
if you run the tsc command again, you will see new files (.js.map) generated among the other files
they are weird files if you look inside, but they act as a bridge to connect the JS files to the input files i.e. the ts files (they are understood by modern browsers and the developer tools)
now in the Sources tab of the developer tools, you see the ts files and you can place breakpoints in them.

### tsconfig.json --> compilerOptions --> "outDir" and "rootDir"
the bigger the project gets, the more you want to organize your files; typically, you want to organize your files in folders.
typically, you have a src (source) folder (which holds all the ts files) and a dist folder (the dist folder has the job of holding all the output i.e. all the js files)

if you compile the ts files, the js files will be placed next to the ts files, but you want them in the dist folder --> outDir
if you set outDir, you tell the ts compiler where the created files should be stored
"outDir": "./dist"
then you have to change the path of the compiled js files in index.html to dist/app.js
the folder structure that you have in the src filder will be replicated in the dist folder when you compile your ts files

rootDir --> contains the specific path where your ts files are stored in. set
"rootDir" : "./src" to make sure that the typescript compiler does not look into other folders
so if you have other ts files in a directory that is not the src directory, these files will not be compiled

### tsconfig.json --> compilerOptions --> "removeComments"
if you set "removeComments": true then during the compilation all the comments will be removed

### tsconfig.json --> compilerOptions --> "noEmit"
"noEmit": true if you do not want to generate any js files with the compilation, i.e. if you only want to check whether your files are correct

### tsconfig.json --> compilerOptions --> "downlevelIteration"
set "downlevelIteration": true
this option gives you a more exact compilation, which works in some niche cases (e.g. for loops)
this will output more verbose code
so you should turn it on if you have loops and you see that your generated code suddenly behaves differently than it should regarding those loops

### tsconfig.json --> compilerOptions --> "noEmitOnError"
by default it is false
i.e. even if there is an error in you ts files, the code will be compiled and the js file will be generated
if set to true:
"noEmitOnError": true --> then the js files will not be generated if there is a compilation error

### tsconfig.json --> compilerOptions strict options --> "strict"
/* Strict Type-Checking Options */
"strict": true,                           /* Enable all strict type-checking options. */
// "noImplicitAny": false,                 /* Raise error on expressions and declarations with an implied 'any' type. */
// "strictNullChecks": true,              /* Enable strict null checks. */
// "strictFunctionTypes": true,           /* Enable strict checking of function types. */
// "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
// "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
// "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
// "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

if "strict" is true, then automatically all the other ones below are true
if you set all of them to true, then you only need to keep the first one, "strict": true, which groups all the other ones

### tsconfig.json --> compilerOptions code quality options

# Other resources
Attached you find all the code snapshots for this module - you also find them attached to individual lectures throughout this module.

These links might also be interesting:
- tsconfig Docs: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- Compiler Config Docs: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- VS Code TS Debugging: https://code.visualstudio.com/docs/typescript/typescript-debugging
