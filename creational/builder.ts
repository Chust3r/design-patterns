/* 

Definition:

The Builder pattern provides a way to construct a complex object step by step. It allows for the construction of different representations of the same type of object, enabling customization and flexibility without needing a lot of constructor parameters.

When to use it:

- When the creation process of an object is complex or involves several steps.
- When you need to create different variations of an object.
- When you want to separate the construction of an object from its representation.

Practical Example: Building a House

Imagine you're designing an application to build a house. The house can have different components like the number of rooms, floors, the style of the roof, and other features, and you want to ensure that the house can be customized with different configurations.

Problem:

In a typical scenario where a house is created using a constructor, the constructor takes all parameters for the house's components at once. 
As the number of possible components increases, the constructor can become cumbersome, requiring a long list of parameters, which makes it difficult to understand and maintain. 
Additionally, it makes it hard to create variations of houses with different combinations of components, as the constructor parameters are fixed.

Solution:

The Builder pattern allows us to break down the house construction process into smaller, manageable steps. 
We define a builder (`HouseBuilder`) to set each component of the house separately. This allows us to create different types of houses with various configurations without requiring a large number of constructor parameters.
It makes the code more readable, maintainable, and flexible when adding or changing components.

*/

/* Without Builder Pattern */

class House {
	public type: string
	public floors: number
	public rooms: number
	public roofStyle: string

	constructor(type: string, floors: number, rooms: number, roofStyle: string) {
		this.type = type
		this.floors = floors
		this.rooms = rooms
		this.roofStyle = roofStyle
	}

	describe(): void {
		console.log(
			`This is a ${this.type} house with ${this.floors} floors, ${this.rooms} rooms, and a ${this.roofStyle} roof.`
		)
	}
}

/* Usage */

const modernHouse = new House('modern', 2, 5, 'flat')

modernHouse.describe() //→ This is a modern house with 2 floors, 5 rooms, and a flat roof.

const cottageHouse = new House('cottage', 1, 3, 'gable')

cottageHouse.describe() //→ This is a cottage house with 1 floor, 3 rooms, and a gable roof.

/* With Builder Pattern */

class HouseWithBuilder {
	public type: string
	public floors: number
	public rooms: number
	public roofStyle: string

	constructor(type: string, floors: number, rooms: number, roofStyle: string) {
		this.type = type
		this.floors = floors
		this.rooms = rooms
		this.roofStyle = roofStyle
	}

	describe(): void {
		console.log(
			`This is a ${this.type} house with ${this.floors} floors, ${this.rooms} rooms, and a ${this.roofStyle} roof.`
		)
	}
}

interface BuilderProps {
	type: string
	floors: number
	rooms: number
	roofStyle: string
}

class HouseBuilder {
	private props: BuilderProps = {
		type: '',
		floors: 0,
		rooms: 0,
		roofStyle: '',
	}

	set<K extends keyof BuilderProps>(key: K, value: BuilderProps[K]) {
		this.props[key] = value
		return this
	}

	build(): HouseWithBuilder {
		return new HouseWithBuilder(
			this.props.type,
			this.props.floors,
			this.props.rooms,
			this.props.roofStyle
		)
	}
}

/* Usage */

const houseBuilder = new HouseBuilder()

const house1 = houseBuilder
	.set('type', 'modern')
	.set('floors', 2)
	.set('rooms', 5)
	.set('roofStyle', 'flat')
	.build()

house1.describe() //→ This is a modern house with 2 floors, 5 rooms, and a flat roof.

const house2 = houseBuilder
	.set('type', 'cottage')
	.set('floors', 1)
	.set('rooms', 3)
	.set('roofStyle', 'gable')
	.build()

house2.describe() //→ This is a cottage house with 1 floor, 3 rooms, and a gable roof.
