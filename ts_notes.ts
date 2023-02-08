function greet(person: string, date: Date, arr: string[]) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`)
}

let user: string = "Maddison"
let inferedStringUser = "Maddison"

greet(user, new Date(), ["a", "b"])
greet(inferedStringUser, new Date(), ["a", "b"])

// return type
function getFavoriteNumber(): number {
  return 26
}

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}
printCoord({ x: 3, y: 7 })

// Optional perameters with ?
function printName(obj: { first: string; last?: string }) {
  // must check if last is undefined
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase())
  // ...
}
// Both OK
printName({ first: "Bob" })
printName({ first: "Alice", last: "Alisson" })

function printId(id: number | string) {
  console.log("Your ID is: " + id)
}

// Type Aliases
type Point = {
  x: number
  y: number
}

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })

// An interface declaration is another way to name an object type:
interface Point {
  x: number
  y: number
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
}

printCoord({ x: 100, y: 100 })

let x: "hello" = "hello"
// OK
x = "hello"
// ...
x = "howdy"
// Type '"howdy"' is not assignable to type '"hello"'.

function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed())
}

// both of these result in 'true'
Boolean("hello") // type: boolean, value: true
!!"world" // type: true,    value: true

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === "string") {
    console.log(strs)
  }
}

type Fish = { swim: () => void }
type Bird = { fly: () => void }

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim()
  }

  return animal.fly()
}
