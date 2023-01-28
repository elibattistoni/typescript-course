// =============================================================================
//## interfaces
// =============================================================================
//| an interface describes the structure of an object
//| we can use it to describe what an object should look like

//| NB the interface keyword only works in tyepscript, not in vanilla javascript
//| we will use this as a custom type

// NB interaces are used to define objects!!
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
  sayHello(): void;
}

/*
NB we could replace "interace" with "type" and it would work, it compiles without errors
| IMPORTANT an interface and a custom type are not exactly the same (whilst often, you can use them interchangeably)
/ NB interfaces can only be used to describe the structure of an object (you can use type for this as well)
/ but inside of a custom type, you can also store other things, like union types and so on
/ the upside of type is that is more flexible, but interface is clearer
| when you define something with interface, it is very clear that you are defining the structure of an object
| best practice interface should be used for defining the structure of objects

/ with both interface and type you can implement an interface/type in a class
/ i.e. an interface can be used as a contract that a class can implement and that then it should adhere to


type Person {
  name: string;
  age: number;
  
  greet(phrase: string): void;
  sayHello(): void;
}
*/

//| NB we do not define values in the interface!!
//| beause an interface cannot have an initializer

//| NB we can use this to type check an object

let user: Person;

user = {
  name: "Max",
  age: 32,
  greet(phrase: string) {
    console.log(phrase);
  },
  sayHello() {
    console.log("Hello!");
  },
};

//# interface as a contract for creating a class
interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}

interface AnotherInterface {
  age: number;
}

//| NB to tell TS that the following class should adhere / implement this interface
//| it should follow the contract set up by the interface
//| you have to use the "implements" keyword
//| NB IMPORTANT!! you can implement more than one interface (contrary to class inheritance, in which you can inherit only from one class)
//| you only have to separate them with a comma

//| so we say that the Person2 class implements the Greetable interface and AnotherInterface
class Person2 implements Greetable, AnotherInterface {
  name: string;
  age: number;
  constructor(n: string, years: number) {
    this.name = n;
    this.age = years;
  }
  greet(phrase: string) {
    console.log(phrase, this.name);
  }
}

const person2 = new Person2("Elisa", 22);
console.log(person2);
person2.greet("SAY HIIIII");

/// therefore interfaces are often used to share functionality among different classes
/// not regarding their concrete implementation (you cannot have implementation or values inside of interfaces)
/// but regarding the structure, i.e. the features a class should have
/// it is a bit like working with abstract classes, with the difference that the interface has no implementation details at all
/// whereas abstract classes can be a mixture of parts that you have to overwrite and parts that are already concretely implemented
/// NB we use this functionality if we want to force the existence of a method or a property on a class
/// NB this is very useful if we have other parts of our code that rely on this structure

//==============================================
//## readonly interface properties
//==============================================
//| NB inside of an interface you can also add the read-only modifier
//| you cannot add public or private or stuff like that
//| with the readonly modifier you make it clear that this property, in any object you build based on this interface,
//| must only be set once and it is readonly thereafter so it cannot be changed after the object has been initialized
//| you can also use this feature if you use "type"

const greet: Greetable = {
  name: "Greetings",
  greet(phrase: string) {
    console.log(this.name + phrase);
  },
};

// greet.name = "dfnwldkjnfklw"; //NB cannot assign because it is a readonly property

//==============================================
//## optional properties in interfaces
//==============================================
//| you can define optional properties in interfaces and classes
//| add a ? after the property name

interface NewInterface {
  name?: string;
  newMethod?(): void;
}
//| NB this tells typescript that, in classes or objects that implement this interface,
//| this property might exist... but it does not have to!!

//==============================================
//## inheritance in interfaces
//==============================================

interface Named {
  name: string;
}
//| this interface above makes sure that we have a name property

interface Shoe {
  brand: string;
}

//| for an interface to inherit from another interface, use "extends"
interface SayHello extends Named, Shoe {
  greet(phrase: string): void;
}
//| therefore the SayHello interface forces us to define objects in which we must have the name property
//| and the greet method
//| NB you can inherit from multiple interfaces

//==============================================
//## interfaces to define the structure of a function
//==============================================
//| i.e. they can be used as a replacement for the function types

// we can define the type of a function in this way (i.e. with a custom type; NB this is what we have already learned):
type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => n1 + n2;

//| NB you can also use interfaces
interface AddFnInterface {
  (a: number, b: number): number;
}
// so it is basically how we defined a method in the interfaces before, but
// the method in this case has no name, so he have an
//| anonymous function in the AddFnInterface
//| and TS understands that you want to use this interface as a function type
//| NB remember that in this case, for defining function types, using a custom type with the type keyword is more common
