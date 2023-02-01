when using ES6 modules, whilst our code was more manageable, we actually had another disadvantage and the solution is Webpack.

# What is Webpack and why do we need it?
If you go in the Network tab in the Dev Tools, you can see that there are a lot of HTTP requests that are sent (from app.js, project-input.js, project-list.js,...)
--> if you look at the Waterfall, you will see that they all take some time --> we need a way to reduce that amount of HTTP requests --> webpack is a tool that helps us bind all our files together

--> Webpack is a bundling and "build orchestration" tool: it is a tool that helps us reduce the amount of HTTP requests by bundling code together --> in addition webpack can optimize our code NB to make it as small as possible (otherwise it would not be as small as possible!) and it allows us to add more build steps (e.g. more build tools, to help us with CSS files)

We wanna write perfectly readable code as a developer. But it would be great if we had a tool that then shortens this code and really makes it as small as possible, uses as short as possible variable and function names, so that we ship as little code as possible. Because less code means that users can download it faster, which means our application can start up faster on our machines.

## Installing webpack and important dependencies
In the next lecture, we will use a third-party tool (Webpack) to create a new project. This tool, under the hood, uses NodeJS - a software which you need to download as part of the next lecture.
You will learn about the details in the next lectures but make sure that you DON'T use NodeJS version 17 for the moment! Because at the moment, due to a bug, the created project won't work with that version.
Instead, download the LTS version of NodeJS. You can download that version via this link (use the "LTS" version): https://nodejs.org/en/download/

# IMPORTANT --> installing webpack
>>> npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader

- webpack --> it transforms the typescript code into javascript code and then create a bundled JS file
- webpack-cli --> to run webpack commands in out project
- webpack-dev-server --> to have the builtin development server --> this allows us to have the built-in development server, starts webpack under the hood, watches our files for changes, automatically triggers webpack to recompile when something changes, and which auto serves our page
- typescript --> it is a good practice to install a copy of typescript per project (in addition to have it installe dglobally on our machine), so that for this project you have a specific typescript version --> the advantage is that if you change the global ts version, you will not break your project setup (so best practice to lock in a specific version of typescript)
- ts-loader is a package that works together with webpack --> it tells webpack how to convert ts code to js

# Configuring tsconfig.json and the webpack.config.js
- cfr "tsconfig.json"
- add a new file with name IMPORTANT (must be exactly this): "webpack.config.js"
- in package.json add the script for >>> npm run build


# https://webpack.js.org/