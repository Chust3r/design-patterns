/* 

Definition:

The Factory Method pattern provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that are created. It promotes extension over modification.


When to use it

- When you don't want to explicity specify the concrete classes of objects to be created.
- When you need subclasses to decide which concrete object to create.
- When working with families o related objects.

*/

/*

Practical Example: Creating vehicles

Imagine you're designing an application for a factory that produces different types of vehicles (cars, bikes, etc.).

*/

/* Without the Factory Method */

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

/* With factory method */

interface Vehicle {
	drive(): void
}

class CarWithFactory implements Vehicle {
	drive(): void {
		console.log('Driving a car')
	}
}

class WithBikeFactory implements Vehicle {
	drive(): void {
		console.log('Driving a bike')
	}
}

abstract class VehicleFactory {
	abstract create(): Vehicle

	operate() {
		const vehicle = this.create()
		vehicle.drive()
	}
}

class CarFactory extends VehicleFactory {
	create(): Vehicle {
		return new CarWithFactory()
	}
}

class BikeFatcory extends VehicleFactory {
	create(): Vehicle {
		return new WithBikeFactory()
	}
}

/* Usage */

const carFactory = new CarFactory()

carFactory.operate() //→ Driving a car

const bikeFactory = new BikeFatcory()

bikeFactory.operate() //→ Driving a bike
