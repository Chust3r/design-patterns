/*

Definition:

The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. It is particularly useful for managing shared resources, such as a database connection, where you want to ensure that only one connection is used throughout the entire application.

When to use it:

When you need to ensure that only one instance of a class is created.
When you need a global access point to that instance.
When managing shared resources (e.g., database connections) in a way that avoids resource duplication.

Practical Example: Cloning Shapes

Imagine you're building an application that draws shapes, such as circles and rectangles. You want to create many similar shapes, but manually instantiating each one can be inefficient, especially when they share the same properties (like color or dimensions). This is where the Singleton pattern helps by ensuring that only one instance of each shape is created and reused, reducing the overhead of creating new instances.

Problem:

When managing shared resources like database connections, creating multiple instances can lead to resource duplication and performance issues. Without the Singleton pattern, every time a connection is created, a new instance is generated, leading to multiple database connections, which can put unnecessary load on the system.

Solution:

By using the Singleton pattern, we can ensure that only one instance of the database connection exists. This provides a global point of access to the connection, preventing duplication and optimizing resource usage.

*/

/* Without Singleton */

class DatabaseConnectionWithoutSingleton {
	constructor(private connectionString: string) {
		console.log(`Connecting to ${this.connectionString}`)
	}

	connect(): void {
		console.log('Database connection established successfully.')
	}

	disconnect(): void {
		console.log('Database connection closed.')
	}
}

/* Usage */

const db1 = new DatabaseConnectionWithoutSingleton('postgres://localhost:5432')
const db2 = new DatabaseConnectionWithoutSingleton('postgres://localhost:5432')

db1.connect() //→ Connecting to postgres://localhost:5432
db2.connect() //→ Connecting to postgres://localhost:5432

db1.disconnect() //→ Database connection closed.
db2.disconnect() //→ Database connection closed.

/* With Singleton */

class DatabaseConnectionWithSingleton {
	private static instance: DatabaseConnectionWithSingleton

	private constructor(private connectionString: string) {
		console.log(`Connecting to ${this.connectionString}`)
	}

	static getInstance(
		connectionString: string
	): DatabaseConnectionWithSingleton {
		if (!DatabaseConnectionWithSingleton.instance) {
			DatabaseConnectionWithSingleton.instance =
				new DatabaseConnectionWithSingleton(connectionString)
		}
		return DatabaseConnectionWithSingleton.instance
	}

	connect(): void {
		console.log('Database connection established successfully.')
	}

	disconnect(): void {
		console.log('Database connection closed.')
	}
}

/* Usage */

const db3 = DatabaseConnectionWithSingleton.getInstance(
	'postgres://localhost:5432'
)
const db4 = DatabaseConnectionWithSingleton.getInstance(
	'postgres://localhost:5432'
)

db3.connect() //→ Connecting to postgres://localhost:5432
db4.connect() //→ Connecting to postgres://localhost:5432

db3.disconnect() //→ Database connection closed.
db4.disconnect() //→ Database connection closed.
