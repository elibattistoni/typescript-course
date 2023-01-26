//==============================================================================
//# core data types: object
//==============================================================================

const person: { name: string; age: number } = {
  name: "Elisa",
  age: 32,
};

/*
NB
: { name: string; age: number }
this is just TS representation of an object type that helps TS understand the objects you are working with
it is not creating some JS object
*/

console.log(person.name);

//==============================================================================
//# core data types: nested objects
//==============================================================================
const product: {
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  };
} = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};

//==============================================================================
//# core data types: arrays
//==============================================================================

const hobbies: string[] = ["volleyball", "swimming"];

const favoriteActivities: any[] = ["cars", 1];
//| NB you can use the type any, if you have mixed arrays, but this destroys the benefit that typescript offers

for (const hobby of hobbies) {
  console.log(hobby.toLowerCase());
}

//==============================================================================
//# core data types: tuple (only TS)
//==============================================================================

const role: [number, string] = [2, "author"];
//| NB so with a tuple, which is defined in this way
//| and TS knows that at 0 there is a number and that at 1 there is a string
//| a tuple is a special array with exactly 2 elements (NB there is only in TS, not in JS)

//| NB .push() is an exception (it is allowed in tuples): you can do it

role.push("admin");
console.log(role);

//| so the length is not enforced if you use .push()
//| but it is enforced if you use role = [1, "person", "reader"]

/*
| if you have a scenario where you need exactly X amount of values in an array and
| you know the type of each value in advance,
| then you might want to consider a tuple instead of an array to get even more strictness into your app,
| to be even clearer about the type of data you're working with
| and the type of data you're expecting.
*/

//=============================================================================================
//# core data types: enum (only TS) --> automatically enumerated global constants identifiers
//=============================================================================================
//| related to the idea of tuples --> is the idea of having a couple of specific identifiers, global constants you might be working with in your app
//| which you want to represent as numbers but to which you want to assign a human readable label
//| NB for this we have the enum type (JS does not know it)
//| enum { NEW, OLD}
//| this gives you an enumerated list: these labels are just translated to numbers
//| starting at zero, where you have human readable lables you can work with in your code

const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;

let user = 0;
if (user === ADMIN) console.log("it's admin");

//| NB enum makes it easier
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
//| so behind the scenes, ADMIN receives the number 0, AUTHOR the number 2, ...
//| NB often you will see enums with all uppercase values, but that is not a must do --> you can go with any value names
//| then you can access:
console.log("Role.ADMIN", Role.ADMIN);

enum Ciao {
  AAA = 4,
  BBB,
  CCC,
}
//| NB you can set an initial value and then the following ones will be automatically incremented by 1
console.log("Ciao.C", Ciao.CCC);
//| you can also assign your own values to all of these identifiers
//| you are not restricted to numbers, you can use strings, e.g.:
enum Hello {
  ABA = "ABA",
  BCB = "BCB",
  QQ = 1,
}
