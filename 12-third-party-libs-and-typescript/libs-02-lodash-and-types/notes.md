# How to make javascript libraries to work in typescript?

example: lodash

google lodash types --> https://www.npmjs.com/package/@types/lodash --> https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash --> this github repo contains tons of translations for all kinds of third party libraries

IMPORTANT --> if you're working with a library that does not contain built-in translation files, and that is not natively written in TypeScript, then, using such a types packages is the solution.
>>> npm install --save-dev @types/lodash