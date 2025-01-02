/* 

Definition:

The Builder pattern provides a way to construct a complex object step by step. It allows for the construction of different representations of the same type of object, enabling customization and flexibility without needing a lot of constructor parameters.

When to use it:

When the creation process of an object is complex or involves several steps.
When you need to create different variations of an object.
When you want to separate the construction of an object from its representation.
Practical Example: Building a Vehicle
Imagine you're designing an application to build a vehicle. The vehicle can have different components like wheels, engine, and body type, and you want to ensure that the vehicle can be customized with different configurations.

*/

/* Without Builder Pattern */

class Vehicle {
	public type: string
	public wheels: number
	public engine: string
	public color: string

	constructor(type: string, wheels: number, engine: string, color: string) {
		this.type = type
		this.wheels = wheels
		this.engine = engine
		this.color = color
	}

	drive(): void {
		console.log(
			`Driving a ${this.color} ${this.type} with ${this.engine} engine and ${this.wheels} wheels.`
		)
	}
}

/* Usage */

const car = new Vehicle('car', 4, 'V6', 'red')

car.drive() //→ Driving a red car with V6 engine and 4 wheels.

const bike = new Vehicle('bike', 2, 'single', 'blue')

bike.drive() //→ Driving a blue bike with single engine and 2 wheels.

/* With Builder Pattern */

class VehicleWithBuilder {
	public type: string
	public wheels: number
	public engine: string
	public color: string

	constructor(type: string, wheels: number, engine: string, color: string) {
		this.type = type
		this.wheels = wheels
		this.engine = engine
		this.color = color
	}

	drive(): void {
		console.log(
			`Driving a ${this.color} ${this.type} with ${this.engine} engine and ${this.wheels} wheels.`
		)
	}
}

interface BuilderProps {
	type: string
	wheels: number
	engine: string
	color: string
}

class VehicleBuilder {
	private props: BuilderProps = {
		type: '',
		wheels: 0,
		engine: '',
		color: '',
	}

	set<K extends keyof BuilderProps>(key: K, value: BuilderProps[K]) {
		this.props[key] = value
		return this
	}

	build(): VehicleWithBuilder {
		return new VehicleWithBuilder(
			this.props.type,
			this.props.wheels,
			this.props.engine,
			this.props.color
		)
	}
}

/* Usage */

const vehicleBuilder = new VehicleBuilder()

const car2 = vehicleBuilder
	.set('type', 'car')
	.set('wheels', 4)
	.set('engine', 'V6')
	.set('color', 'red')
	.build()

car.drive() //→ Driving a red car with V6 engine and 4 wheels.
