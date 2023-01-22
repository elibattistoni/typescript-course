# TypeScript

TypeScript is a JavaScript superset === i.e. a programming language building upon Javascript; it adds new features and advantages to JS, it makes writing JS code easier and more powerful.

Huge disadvantage: TS cannot be executed by JS environments like the browser --> TS cannot be executed by the browser, by NodeJS.

Typescript is a programming languange but also a tool --> it is a powerful compiler that you can run over your code to compile TS code to JS code --> so you write typescript code, with all the new features and advantages, and then you get normal javascript code.

the typescript compiler compiles these new features to JS workarounds: it gives you a nicer syntax and an easier way of doing something, and then it compiles that nice, easier way to a more comples JS snippet which you would have to write otherwise.

An important addition of TS is that it adds types --> this feature gives you as a developer an opportunity of identifying errors in your code before your script runs and the error occurs at runtime in the browser --> so it gives you extra error checking where errors, which you would otherwise get as runtime errors, can be caught and fixed early during development.

# Install TypeScript
>>> npm install -g typescript

# Compile a TypeScript file to JavaScript
IMPORTANT to compile a TypeScript file to JavaScript, you can use the command
>>> tsc script.ts

NB the compilation process might throw an error (compiler error) if there is something wrong with your TS file; but by default it will still compile your file to JS (we will learn how to suppress this behavior)

# TypeScript Advantages -- overview