/*

Definition:

The Factory Method pattern provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that are created. It promotes extension over modification.

When to use it:

When you don't want to explicitly specify the concrete classes of objects to be created.
When you need subclasses to decide which concrete object to create.
When working with families of related objects.

Practical Example: Animal creation

Imagine you're building an application where animals can be created, such as dogs and cats. Each animal type should have its own behavior (like speaking), but you don't want to specify the concrete class of the animal every time.

Problem:

In an application where you need to create objects of related types (e.g., animals like dogs and cats), directly instantiating the objects may lead to tight coupling and the need to modify the code each time a new type of animal is added. The AnimalFactory class works fine for a small number of animal types, but as more animal types are introduced, it becomes difficult to maintain and extend. Adding a new type requires modifying the Factory class.

Solution:

By applying the Factory Method pattern, we move the responsibility of creating objects to subclasses, allowing new animal types to be added without modifying the base Factory class. Each subclass is responsible for creating its own specific type of animal, enabling the system to be easily extended.

*/

/* Without the Factory Method */

class Dog {
	speak(): void {
		console.log('Barking')
	}
}

class Cat {
	speak(): void {
		console.log('Meowing')
	}
}

type AnimalType = 'dog' | 'cat'

class AnimalFactory {
	static create(type: AnimalType) {
		if (type === 'dog') return new Dog()
		if (type === 'cat') return new Cat()
		throw new Error('Unknown animal type')
	}
}

/* Usage */

const dog = AnimalFactory.create('dog')

dog.speak() //→ Barking

const cat = AnimalFactory.create('cat')

cat.speak() //→ Meowing

/* With Factory Method */

interface Animal {
	speak(): void
}

class DogWithFactory implements Animal {
	speak(): void {
		console.log('Barking')
	}
}

class CatWithFactory implements Animal {
	speak(): void {
		console.log('Meowing')
	}
}

abstract class AnimalFactoryMethod {
	abstract create(): Animal

	interact() {
		const animal = this.create()
		animal.speak()
	}
}

class DogFactory extends AnimalFactoryMethod {
	create(): Animal {
		return new DogWithFactory()
	}
}

class CatFactory extends AnimalFactoryMethod {
	create(): Animal {
		return new CatWithFactory()
	}
}

/* Usage */

const dogFactory = new DogFactory()

dogFactory.interact() //→ Barking

const catFactory = new CatFactory()

catFactory.interact() //→ Meowing
