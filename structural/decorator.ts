/*

 Definition:
 The Decorator pattern allows you to dynamically add behavior or responsibilities to an object without modifying its structure. It provides a flexible alternative to subclassing for extending functionality.

 When to use it:
 - When you need to dynamically add or remove behavior to/from an object.
 - When subclassing would result in an explosion of subclasses to represent every combination of behaviors.
 - When you want to adhere to the open/closed principle by extending functionality without modifying existing code.

 Practical Example: Adding Power-Ups in Video Games

 Imagine a video game where characters can acquire power-ups like shields, weapons, or speed boosts. You want to add these abilities dynamically without changing the character's base class.

 Problem:
 Creating separate subclasses for each combination of power-ups would lead to a complex and rigid hierarchy. Additionally, hardcoding abilities would reduce flexibility.

 Solution:
 The Decorator pattern allows you to wrap the character object with various decorators, each adding a specific ability or modifying behavior.
 */

/* Without Decorator */

// Base character class
class BasicCharacter {
	constructor(public name: string) {}

	getDescription(): string {
		return this.name
	}

	getPowerLevel(): number {
		return 10
	}
}

/* Usage without Decorator */
const basicHero = new BasicCharacter('Hero')
console.log(basicHero.getDescription()) // Output: Hero
console.log(`Power Level: ${basicHero.getPowerLevel()}`) // Output: Power Level: 10

/* With Decorator */

// Base interface
interface Character {
	getDescription(): string
	getPowerLevel(): number
}

// Concrete implementation
class GameCharacter implements Character {
	constructor(public name: string) {}

	getDescription(): string {
		return this.name
	}

	getPowerLevel(): number {
		return 10
	}
}

// Abstract decorator
abstract class PowerUpDecorator implements Character {
	constructor(protected character: Character) {}

	abstract getDescription(): string
	abstract getPowerLevel(): number
}

// Concrete decorators
class ShieldDecorator extends PowerUpDecorator {
	getDescription(): string {
		return `${this.character.getDescription()} with a shield`
	}

	getPowerLevel(): number {
		return this.character.getPowerLevel() + 15
	}
}

class WeaponDecorator extends PowerUpDecorator {
	getDescription(): string {
		return `${this.character.getDescription()} with a weapon`
	}

	getPowerLevel(): number {
		return this.character.getPowerLevel() + 20
	}
}

class SpeedBoostDecorator extends PowerUpDecorator {
	getDescription(): string {
		return `${this.character.getDescription()} with a speed boost`
	}

	getPowerLevel(): number {
		return this.character.getPowerLevel() + 5
	}
}

/* Usage with Decorator */
const hero = new GameCharacter('Hero')

// Add a shield
const heroWithShield = new ShieldDecorator(hero)
console.log(heroWithShield.getDescription()) // Output: Hero with a shield
console.log(`Power Level: ${heroWithShield.getPowerLevel()}`) // Output: Power Level: 25

// Add a weapon
const heroWithShieldAndWeapon = new WeaponDecorator(heroWithShield)
console.log(heroWithShieldAndWeapon.getDescription()) // Output: Hero with a shield with a weapon
console.log(`Power Level: ${heroWithShieldAndWeapon.getPowerLevel()}`) // Output: Power Level: 45

// Add a speed boost
const fullyPoweredHero = new SpeedBoostDecorator(heroWithShieldAndWeapon)
console.log(fullyPoweredHero.getDescription()) // Output: Hero with a shield with a weapon with a speed boost
console.log(`Power Level: ${fullyPoweredHero.getPowerLevel()}`) // Output: Power Level: 50
