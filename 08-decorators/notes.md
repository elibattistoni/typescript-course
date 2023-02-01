# Decorators
Decorators are a very useful feature for meta-programming --> i.e. decorators are not used to have a direct impact on the user visiting you page, but **decorators are very well suited for writing code, which is then easier to use by other developers**

NB with decorators we can guarantee that a class is use correctly, or a method in a class

IMPORTANT CONFIGURATION STEP
- in the tsconfig.json file --> make sure that "target": "es6" + at the bottom add "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */


More on decorators --> https://www.typescriptlang.org/docs/handbook/decorators.html