/* 

Definition:

The Abstract Factory pattern provides an interface for creating families of related or dependent objects 
without specifying their concrete classes. It promotes the creation of objects through abstract interfaces, 
allowing the implementation to vary.

When to use it

- When you have families of related or dependent objects.
- When you want to provide a way to create a set of related objects without specifying their concrete types.
- When you want to ensure that the related objects are created in a consistent manner.

*/

/*

Practical Example: Creating vehicles with factories

Imagine you're designing an application for a factory that produces different types of vehicles (cars, bikes, etc.). 
You want to ensure that when a certain vehicle type is created, it comes with all its related components (e.g., a specific type of engine or wheels).

*/

/* Without Abstract Factory */

class Car {
	drive(): void {
		console.log('Driving a car')
	}
}

class Bike {
	drive(): void {
		console.log('Driving a bike')
	}
}

type VehicleType = 'car' | 'bike'

class Factory {
	static create(type: VehicleType) {
		if (type === 'car') return new Car()
		if (type === 'bike') return new Bike()
		throw new Error('Unknown vehicle type')
	}
}

/* Usage */

const car = Factory.create('car')

car.drive() //→ Driving a car

const bike = Factory.create('bike')

bike.drive() //→ Driving a bike

/* With Abstract Factory */

interface Vehicle {
	drive(): void
}

class CarWithFactory implements Vehicle {
	drive(): void {
		console.log('Driving a car')
	}
}

class BikeWithFactory implements Vehicle {
	drive(): void {
		console.log('Driving a bike')
	}
}

/* Abstract Factory */

abstract class VehicleFactory {
	abstract createVehicle(): Vehicle
	abstract createEngine(): string

	assemble(): void {
		const vehicle = this.createVehicle()
		const engine = this.createEngine()
		console.log(engine)
		vehicle.drive()
	}
}

/* Concrete Factories */

class CarFactory extends VehicleFactory {
	createVehicle(): Vehicle {
		return new CarWithFactory()
	}
	createEngine(): string {
		return 'Car engine assembled!'
	}
}

class BikeFactory extends VehicleFactory {
	createVehicle(): Vehicle {
		return new BikeWithFactory()
	}
	createEngine(): string {
		return 'Bike engine assembled!'
	}
}

/* Usage */

const carFactory = new CarFactory()
carFactory.assemble() //→ Car engine assembled! → Driving a car

const bikeFactory = new BikeFactory()
bikeFactory.assemble() //→ Bike engine assembled! → Driving a bike