TS provides many types to JavaScript. JS itself also knows some data types, but TS adds many more types and NB it allows you to write your own types.

# Core Typescript Types
1. number
2. string
3. boolean
4. object
5. array
6. tuple
7. enum
8. any

# number
number type --> one of the core types we work with JS and TS
--> NB in JS and TS there is only ONE number type (there is no special type for integers or floats)

# string
--> all text values --> that you can define in one of 3 ways:
''
""
``

# boolean
--> true, false
--> not truthy or falsy values (example of falsy value is 0) --> NB the concept of truthy and falsy values is not related to data types, it is behind the scenes work

# object
Any JS object, but more specific types (type of object) are possible --> e.g. this is an object which has these properties, or which has to be based on this or that constructor function

# array
Any JS array, type can be flexible or strict (regarding the element types)

# tuple
JS does not have tuple
tuple == fixed length and fixed type array

# enum
JS does not know the enum type

# any
it is the most flexible type you can assign in TS --> NB this type does not tell TS anything, it means that you can store any kind of value in there.
NB avoid any whenever possible, because it takes away basically all advantages that TTS gives you.


# more types:
    - union types
    - literal types
    - type aliases & custom types

--------------------------
--------------------------

# Typescript  vs Javascript
NB Typescript's type system only helps us during the development process (before the code gets compiled)

JS --> dynamically typed --> JS uses "dynamic types" (i.e. resolved at runtime)
TD --> statically typed --> TS uses "static types" (i.e. set suring development) NB you get support only during development.. after the compilation it becomes JS


# Typescript Type Casing
In TypeScript, you work with types like string or number all the times.
Important: It is string and number (etc.), NOT String, Number etc.
The core primitive types in TypeScript are all lowercase!