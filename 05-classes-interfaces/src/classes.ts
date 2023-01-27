// =============================================================================
//## example 1 (creating a class and the this keyword)
// =============================================================================

//| define a class
class Department {
  // name: string = "DEFAULT"; //| like this if you want to set a default
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log(`Department: ${this.name}`);
  }

  describeThis(this: Department) {
    //| NB the this parameter is not really expected (you can also not pass it, see describe())
    //| Nb but if you pass it, it gives TS a hint about what "this" should be referred to, and you have to assign a type to "this"
    //| and the type should be the class type, i.e. Department
    //| so when describeNew is executed, the this.name called inside of the describeNew function,
    //| should always refer to an instance that is based on the Department class
    console.log(`Department: ${this.name}`);
  }
}

//| instantiate an object with class Department
const accounting = new Department("Accounting");
console.log(accounting);
accounting.describe();

// =============================================================================
//## example 2 (private properties and methods)
// =============================================================================
class NewDepartment {
  // public name: string; //| NB public is the default, therefore there is no need to add it
  private name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: NewDepartment) {
    console.log(this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const research = new NewDepartment("research");
research.describe();

research.addEmployee("Elisa");
research.addEmployee("Cristina");

//| NB when building complex applications, you want to make sure that operations like this:
// research.employees[2] = "Anna"
//| are not allowed
//| so you want to make sure that research.employees is not accessible like this, outside of the class
//| NB IMPORTANT with Typescript you can turn this property into a PRIVATE PROPERTY, a PRIVATE FIELD by adding the "private" keyword in front of it
//| NB besides private properties, you can also have private methods
//| this makes it so that now employees is a property that is accessible only from inside of the class
//| NB the "private" keyword is a "modifier"
//| NB we also have the "public" modifier, but it is the default, therefore there is no need to add it
//| NB and public properties and methods are accessible from outside

research.printEmployeeInfo();

// =============================================================================
//## example 3 (shorthand initialization & read-only properties)
// =============================================================================

class School {
  //| NB if you have a field that you want to make clear that it should not change, you can add the "readonly" modifier
  //| and it makes sure that if you try to write to this property, you fail
  //| to make it clear that a property should be initialized once and should not change thereafter
  constructor(
    private readonly id: string,
    public grade: string,
    public name: string,
    public founded: number
  ) {}

  describe(this: School) {
    console.log(
      `School id ${this.id}, grade ${this.grade}, name ${this.name}, founded in ${this.founded}`
    );
  }
}
//| NB this is a shortcut to avoid double initialization

const school1 = new School("s1", "first-grade", "Da Vinci", 1970);
school1.describe();

// =============================================================================
//## example 4 (inheritance)
// =============================================================================
//| NB you can inherit from only one class, not from more than one class

class FirstGradeSchool extends School {}

//| NB even if there is no constructor method in FirstGradeSchool,
//| the constructor of School is automatically used when we instantiate our class
const school2 = new FirstGradeSchool("s2", "first-grade", "Da Vinci", 1970);
school2.describe();

//| but we can add our own constructor
class SecondGradeSchoolDaVinci extends School {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "second-grade", "Da Vinci", 1970); //| IMPORTANT this calls the constructor of the base class
    //| therefore super takes the arguments of the parent class constructor (i.e. id and name)
    //| NB you have to call super() before you do anything with the this keyword
    this.admins = admins;
  }
}

const school3 = new SecondGradeSchoolDaVinci("s3", ["Max", "Elisa"]);
school3.describe();
console.log(school3);

// =============================================================================
//## example 5 (protected properties and methods)
// =============================================================================

//| NB you can also overriude methods or properties of the base class
//| IMPORTANT NB private properties are only accessible from inside the class in which they are defined, and NOT classes that inherit from that class
//| NB if we want to grant access to classes that inherit from the base class, but still make sure that they cannot be accessed from outside, you can add the "protected" modifier

class Car {
  protected brand: string;
  protected yearOfRelease: number;

  constructor(brand: string, yearOfRelease: number) {
    this.brand = brand;
    this.yearOfRelease = yearOfRelease;
  }

  printBrand(this: Car) {
    console.log(this.brand);
  }

  printYear(this: Car) {
    console.log(this.yearOfRelease);
  }
}

const car1 = new Car("audi", 1800);
car1.printBrand();
car1.printYear();
// console.log(car1.brand)

class Mercedes extends Car {
  country: string;

  constructor(year: number, country: string) {
    super("Mercedes", year);
    this.brand = "MercedesProtected";
    this.country = country;
  }
}

// =============================================================================
//## example 6 (getters and setters)
// =============================================================================
console.log("-------------- example getters and setters --------------------");

//| NB a getter is a property where you execute a function or a method when you
//| retrieve a value, and that allows you as a developer to add more complex logic
//| NB a getter method must return something

class Reports {
  private lastReport: string;
  private reports: string[];

  //| NB getter --> outside of the class you access this as if it was just a property
  get mostRecentReport() {
    if (!this.lastReport) throw new Error("No report found.");
    return this.lastReport;
  }

  //| setter --> you can use this with the same name as the getter
  //| you still acces this (outside of the class) as if it was a property
  set mostRecentReport(value: string) {
    if (!value) throw new Error("Please pass in a valid value!");
    this.addReport(value);
  }

  constructor(reports: string[]) {
    this.reports = reports;
    this.lastReport = reports.length > 0 ? reports[0] : "";
  }

  addReport(report: string) {
    this.reports.unshift(report);
  }
}

const myReports = new Reports(["aaa", "bbb", "ccc"]);
myReports.addReport("ddd");
console.log(myReports);
console.log(myReports.mostRecentReport);

myReports.mostRecentReport = "QQQ";
console.log(myReports);

console.log(myReports.mostRecentReport);

// =============================================================================
//## example 7 (static methods and properties)
// =============================================================================
//| static properties and methods allow you to add properties and methods to classes that are not accessed on the instance of the class
//| but which you access directly on the class
//| NB this is often used for utility functions that you want to group or map to a class logically,
//| or global constants which you also want to store in a class
//| e.g. the Math constructor function
Math.PI; // to access th pi as a constant value
Math.random(); // to access methods
//| these are properties and methods that you do not access on the instance of Math
//| you access these properties and methods directly on the class itself
//| so Math acts more like a namespace or as a grouping mechanism
//| for this you nedd to add the static modifier in front of the method/property that you want to be static
//| but NB that when you add them on a class, you cannot access them from inside of your non static parts
//| everything that is not marked with the modifier static cannot access static properties or methods
//| inside of the class you cannot access them with the this keyword, but you have to access them with the name of the class
//| e.g. not this.fiscalYear (where fiscalYear is a static property) but Department.fiscalYear

// =============================================================================
//## example 8 (abstract classes)
// =============================================================================
//| you can add the abstract modifier/keyword in front of the methods you want to abstract
//| and you have to add abstract also in front of the class as well

abstract class Deeepartment {
  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name: name };
  }

  //| IMPORTANT
  abstract describe(this: Department): void;
  //| NB in this way, this method has to be implemented by all classes that inherit from this abstract class
  //| so this is the way for enforcing a definition of something in a class that inherits from another class
}

class ITDepartment extends Deeepartment {
  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

/*
Abstract can be very useful if you wanna
enforce that all classes based on some other class,
share some common method or property,
But at the same time,
you wanna make sure that you don't have to provide
the concrete value, the concrete implementation
in the base class, but instead,
the inheriting class has to do that.
NB classes with the abstract keyword cannot be instantiated
*/

// new Deeepartment

// =============================================================================
//## example 9 (singletons and private constructors)
// =============================================================================
//| the singleton pattern is about ensuring that you always have exactly one instance of a certain class
//| this can be useful if you cannot use static methods or properties (or you don't want to)
//| but at the same time you want to make sure that you cannot create multiple objects based on a class
//| but that you always have exactly one object based on a class

//| e.g. we want to make sure that we can only create exactly one accounting department
//| to enforce this, we can turn the constructor into a private constructor
class AccountingDepartment extends Deeepartment {
  private yearOf: number;
  private static instance: AccountingDepartment;

  private constructor(id: string, year: number) {
    super(id, "Accounting");
    this.yearOf = year;
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d1", 1990);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id + this.yearOf);
  }
}
//| this ensures that we cannot call the new on this
// new AccountingDepartment
const acc1 = AccountingDepartment.getInstance();
const acc2 = AccountingDepartment.getInstance();
console.log(acc1);
console.log(acc2);
//| and they are exactly equal, they are the same instance
