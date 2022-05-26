// 1
class Student {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  set name(name: string) {
    this._name = name;
  }

  set age(age: number) {
    this._age = age;
  }
}

class Head extends Student {
  constructor(name: string, age: number) {
    super(name, age);
  }
}

class Group {
  _students: Student[];
  _head: Head;

  constructor(students: Student[], head: Head) {
    this._students = students;
    this._head = head;
  }

  set students(students: Student[]) {
    this._students = students;
  }

  set head(head: Head) {
    this._head = head;
  }

  getStudents() {
    const studentsParsed = [];

    for (let student of this._students) {
      const studentData: Record<string, any> = {};

      Object.entries(student).forEach(([k, v]) => {
        studentData[k] = v;
      });

      studentsParsed.push(studentData);
    }
    return studentsParsed;
  }

  get head() {
    return this._head;
  }
}

// 2
class StudentRo {
  private readonly _name: string;
  private readonly _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }
}

class HeadRo extends StudentRo {
  constructor(name: string, age: number) {
    super(name, age);
  }
}

class GroupRo {
  private readonly _students: StudentRo[];
  private readonly _head: HeadRo;

  constructor(students: StudentRo[], head: HeadRo) {
    this._students = students;
    this._head = head;
  }

  getStudents() {
    console.log(123);
    const studentsParsed = [];

    for (let student of this._students) {
      const studentData: Record<string, any> = {};

      Object.entries(student).forEach(([k, v]) => {
        studentData[k] = v;
      });
      studentsParsed.push(studentData);
    }
    return studentsParsed;
  }

  get head() {
    return this._head;
  }
}

console.log("Вариант без возможности замены");

const student1 = new Student("Вася", 20);
const student2 = new Student("Ира", 18);
const student3 = new Student("Анатолий", 21);

const group = new Group([student1, student2, student3], student2);
console.log("group students: ", group.getStudents());
console.log("group head: ", group.head);

student1.name = "Костя";
group.students = [student2];

console.log("new group students: ", group.getStudents());
console.log("new group head: ", group.head);

console.log("================");
console.log("Вариант c возможностью замены");
console.log("================");

const student4 = new StudentRo("Вася", 20);
const student5 = new StudentRo("Ира", 18);
const student6 = new StudentRo("Анатолий", 21);

const group1 = new GroupRo([student4, student5, student6], student5);
console.log("group students: ", group1.getStudents());
console.log("group head: ", group1.head);

// не можем поменять
//student4.name = "Костя";
//group1.students = [student5];

console.log("new group students: ", group.getStudents());
console.log("new group head: ", group.head);
