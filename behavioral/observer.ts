/*

Definition:

The Observer pattern defines a one-to-many dependency between objects, so that when one object (the subject) changes state, all its dependents (observers) are notified and updated automatically. This is particularly useful for implementing event-driven systems or publish-subscribe mechanisms.

When to use it:

- When changes to one object need to be communicated to multiple dependent objects.
- When the number of dependents is dynamic or unknown at compile time.
- When decoupling the subject and its observers is necessary.

Practical Example: Observer Pattern in a News Subscription System

Imagine a news platform where users can subscribe to a newsletter. Whenever a new article is published, all subscribers should automatically receive a notification.

Problem:

Without the Observer pattern, the platform would need to keep track of all subscribers and manually notify each one. This tight coupling would make the system hard to maintain and scale.

Solution:

The Observer pattern allows the news platform (subject) to notify all subscribers (observers) automatically when a new article is published. Subscribers can dynamically subscribe or unsubscribe.

*/

/* Without Observer */

class Subscriber {
	constructor(public name: string) {}

	notify(article: string): void {
		console.log(`${this.name} received a new article: ${article}`)
	}
}

class NewsPlatform {
	private subscribers: Subscriber[] = []

	addSubscriber(subscriber: Subscriber): void {
		this.subscribers.push(subscriber)
	}

	removeSubscriber(subscriber: Subscriber): void {
		this.subscribers = this.subscribers.filter((sub) => sub !== subscriber)
	}

	notifySubscribers(article: string): void {
		this.subscribers.forEach((subscriber) => subscriber.notify(article))
	}
}

/* Usage */

const user1 = new Subscriber('Alice')
const user2 = new Subscriber('Bob')
const newsPlatform = new NewsPlatform()

newsPlatform.addSubscriber(user1)
newsPlatform.addSubscriber(user2)

newsPlatform.notifySubscribers('Breaking News: Observer Pattern Explained!')
// Output:
// Alice received a new article: Breaking News: Observer Pattern Explained!
// Bob received a new article: Breaking News: Observer Pattern Explained!

/* With Observer */

interface Observer {
	update(article: string): void
}

class NewsSubscriber implements Observer {
	constructor(public name: string) {}

	update(article: string): void {
		console.log(`${this.name} was notified of a new article: ${article}`)
	}
}

interface Subject {
	registerObserver(observer: Observer): void
	unregisterObserver(observer: Observer): void
	notifyObservers(article: string): void
}

class NewsPublisher implements Subject {
	private observers: Observer[] = []

	registerObserver(observer: Observer): void {
		this.observers.push(observer)
	}

	unregisterObserver(observer: Observer): void {
		this.observers = this.observers.filter((obs) => obs !== observer)
	}

	notifyObservers(article: string): void {
		this.observers.forEach((observer) => observer.update(article))
	}
}

/* Usage */

const subscriber1 = new NewsSubscriber('Charlie')
const subscriber2 = new NewsSubscriber('Diana')
const newsPublisher = new NewsPublisher()

newsPublisher.registerObserver(subscriber1)
newsPublisher.registerObserver(subscriber2)

newsPublisher.notifyObservers(
	'Latest Article: Understanding the Observer Pattern'
)
// Output:
// Charlie was notified of a new article: Latest Article: Understanding the Observer Pattern
// Diana was notified of a new article: Latest Article: Understanding the Observer Pattern

newsPublisher.unregisterObserver(subscriber1)
newsPublisher.notifyObservers('Update: Observer Pattern in Real Life Scenarios')
// Output:
// Diana was notified of a new article: Update: Observer Pattern in Real Life Scenarios
