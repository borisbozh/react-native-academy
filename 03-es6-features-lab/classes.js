const READER = 0
const AUTHOR = 1
const ADMIN = 2
const Role = ['READER', 'AUTHOR', 'ADMIN']

class Person {
    static nextId = 0;
    id = ++ Person.nextId;
    constructor(fName, lName, adress){
        this.fName = fName;
        this.lName = lName;
        this.adress = adress;
    }
    getname(){
        return `${this.fName + ` ` + this.lName}`;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.fName + `  ` +  this.lName}, Address: ${this.adress}`;
    }
}


class User extends Person{
    constructor(fName, lName, adress, username, password, role=READER){
    super(fName, lName, adress)
    this.username = username
    this.password = password
    this.role = role;
    }
    toString(){
        return `${super.toString()}, Username: ${this.username}, Password: ${this.password}, Role: ${Role[this.role]}`;
    }
}

const p1= new Person('John', 'Doe', 'London');
const p2= new Person('Jane', 'Doe', 'NY');
const u1= new User('Boris', 'Bozhinov', 'Sofia', 'mlekarq1', 'bobi123', ADMIN)
const u2= new User('Hrisi', 'Petrova', 'Sofia', 'malkiqjambo', 'hrisipisi')
const persons = [p1, p2, u1, u2]
persons.forEach(p => console.log(p.toString()))
console.log(p1.getname())
console.log(u1.getname())