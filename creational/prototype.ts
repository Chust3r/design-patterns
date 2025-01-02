/*

Definition:

The Prototype pattern is used to create new objects by copying an existing object, known as the prototype. It avoids the need to create new instances manually and simplifies the creation of complex or resource-intensive objects.

When to use it:

When creating new objects from scratch is resource-intensive.
When you need to create many objects with similar properties.
When you want to provide a flexible way to duplicate objects.


Practical Example: Cloning shapes

Imagine you're building an application that draws shapes, such as circles and rectangles. You want to create many similar shapes, but manually instantiating each one can be inefficient, especially when they share the same properties (like color or dimensions).

Problem:

When creating many objects with similar properties, it can be inefficient to manually instantiate each one. This is especially problematic when dealing with resource-intensive objects or complex configurations. Without the Prototype pattern, you may need to duplicate a significant amount of code or data when creating each new instance.

Solution:

By applying the Prototype pattern, we can clone an existing object, creating new instances with the same properties, reducing the need to manually configure each object and optimizing resource usage. The clone() method allows us to create identical copies of an object, making the process of creating similar objects efficient.

*/

/* Without Prototype */

interface ShapePrototype {
	clone(): ShapePrototype
	draw(): void
}

class CircleWithoutPrototype implements ShapePrototype {
	constructor(private radius: number, private color: string) {}

	clone(): ShapePrototype {
		return new CircleWithoutPrototype(this.radius, this.color)
	}

	draw(): void {
		console.log(
			`Drawing a circle with radius ${this.radius} and color ${this.color}.`
		)
	}
}

class RectangleWithoutPrototype implements ShapePrototype {
	constructor(
		private width: number,
		private height: number,
		private color: string
	) {}

	clone(): ShapePrototype {
		return new RectangleWithoutPrototype(this.width, this.height, this.color)
	}

	draw(): void {
		console.log(
			`Drawing a ${this.color} rectangle with dimensions ${this.width}x${this.height}.`
		)
	}
}

/* Usage without Prototype */

const circle1 = new CircleWithoutPrototype(10, 'red')
const circle2 = circle1.clone()

const rectangle1 = new RectangleWithoutPrototype(30, 40, 'green')
const rectangle2 = rectangle1.clone()

circle1.draw() //→ Drawing a circle with radius 10 and color red.
circle2.draw() //→ Drawing a circle with radius 10 and color red.

rectangle1.draw() //→ Drawing a green rectangle with dimensions 30x40.
rectangle2.draw() //→ Drawing a green rectangle with dimensions 30x40.

/* With Prototype */

class CircleWithPrototype implements ShapePrototype {
	constructor(private radius: number, private color: string) {}

	clone(): ShapePrototype {
		return new CircleWithPrototype(this.radius, this.color)
	}

	draw(): void {
		console.log(
			`Drawing a circle with radius ${this.radius} and color ${this.color}.`
		)
	}
}

class RectangleWithPrototype implements ShapePrototype {
	constructor(
		private width: number,
		private height: number,
		private color: string
	) {}

	clone(): ShapePrototype {
		return new RectangleWithPrototype(this.width, this.height, this.color)
	}

	draw(): void {
		console.log(
			`Drawing a ${this.color} rectangle with dimensions ${this.width}x${this.height}.`
		)
	}
}

/* Usage with Prototype */

const circlePrototype = new CircleWithPrototype(15, 'blue')
const clonedCircle1 = circlePrototype.clone()
const clonedCircle2 = circlePrototype.clone()

const rectanglePrototype = new RectangleWithPrototype(50, 70, 'orange')
const clonedRectangle1 = rectanglePrototype.clone()
const clonedRectangle2 = rectanglePrototype.clone()

clonedCircle1.draw() //→ Drawing a circle with radius 15 and color blue.
clonedCircle2.draw() //→ Drawing a circle with radius 15 and color blue.

clonedRectangle1.draw() //→ Drawing an orange rectangle with dimensions 50x70.
clonedRectangle2.draw() //→ Drawing an orange rectangle with dimensions 50x70.
