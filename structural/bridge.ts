/*

Definition:

The Bridge pattern is a structural design pattern that decouples an abstraction from its implementation, allowing both to vary independently. It is used when you want to separate the abstraction (interface) from its concrete implementation, enabling changes in either the abstraction or the implementation without affecting the other.

When to use it:

- When both the abstractions and implementations can evolve independently.
- When you want to avoid a large number of subclasses to handle different combinations of abstractions and implementations.
- When you want to separate the interface of a class from the implementation, making it easier to modify or extend.

Practical Example: Bridge for Drawing Shapes

Imagine you're developing a drawing application. You want to draw different shapes like `Circle` and `Square`, but you also want the flexibility to choose different rendering methods like `Raster` and `Vector` (for example, `PNG`, `JPEG`, `SVG`). The problem is that both shapes and renderings are independent and could lead to a large number of subclasses if combined directly.

Problem:

Without the Bridge pattern, you would need to create a class for every possible combination of shape and rendering method. For example, `CircleRasterRenderer`, `SquareRasterRenderer`, `CircleVectorRenderer`, `SquareVectorRenderer`, and so on. This approach leads to a bloated class hierarchy and makes the code difficult to maintain and extend.

Solution:

The Bridge pattern allows you to separate the abstraction (shape) from the implementation (rendering method). By defining a `Shape` abstraction that uses a `Renderer` interface, you can easily add new shapes or renderers without modifying the existing ones.

*/

/* Without Bridge */

class CircleRasterRenderer {
	render(): void {
		console.log('Rendering Circle with Raster method')
	}
}

class SquareRasterRenderer {
	render(): void {
		console.log('Rendering Square with Raster method')
	}
}

class CircleVectorRenderer {
	render(): void {
		console.log('Rendering Circle with Vector method')
	}
}

class SquareVectorRenderer {
	render(): void {
		console.log('Rendering Square with Vector method')
	}
}

/* Usage */

const circleRaster = new CircleRasterRenderer()
circleRaster.render() // → Rendering Circle with Raster method

const squareVector = new SquareVectorRenderer()
squareVector.render() // → Rendering Square with Vector method

/* With Bridge */

interface Renderer {
	renderShape(): void
}

class RasterRenderer implements Renderer {
	renderShape(): void {
		console.log('Rendering shape with Raster method')
	}
}

class VectorRenderer implements Renderer {
	renderShape(): void {
		console.log('Rendering shape with Vector method')
	}
}

abstract class Shape {
	constructor(protected renderer: Renderer) {}

	abstract draw(): void
}

class Circle extends Shape {
	draw(): void {
		console.log('Drawing Circle:')
		this.renderer.renderShape()
	}
}

class Square extends Shape {
	draw(): void {
		console.log('Drawing Square:')
		this.renderer.renderShape()
	}
}

/* Usage */

const rasterRenderer = new RasterRenderer()
const vectorRenderer = new VectorRenderer()

const circle = new Circle(rasterRenderer)
circle.draw() // → Drawing Circle: Rendering shape with Raster method

const square = new Square(vectorRenderer)
square.draw() // → Drawing Square: Rendering shape with Vector method
