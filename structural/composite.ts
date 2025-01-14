/* 

Definition:

The Composite pattern allows treating individual objects and compositions of objects uniformly. It is especially useful in recursive structures like trees or file systems, where objects (leaves) and compositions (nodes) can be managed with the same interface.

When to use it:

- When you need to represent part-whole hierarchies.
- When you want to treat both individual objects and compositions uniformly.
- When the structure is recursive, like trees or file systems.

Practical Example: Composite for File System

Imagine you're creating a file system where each folder can contain files or other folders. You want to treat both folders and files uniformly.

Problem:

Without the Composite pattern, we would need to differentiate between files and folders in our code. For example, the code that interacts with files might need to be separate from the code that interacts with folders, and traversing through nested folders would become cumbersome.

Solution:

The Composite pattern allows you to treat both files and folders as components of the same structure. We can create an interface that both files and folders implement, allowing us to perform operations on them uniformly.

*/

/* Without Composite */

// Class to represent a TextFile in the system
class TextFileWithoutComposite {
	constructor(public name: string) {}

	getName(): string {
		return this.name
	}

	showDetails(): void {
		console.log(`    ${this.name}`)
	}
}

// Class to represent a Folder in the system
class FolderWithoutComposite {
	private children: (TextFileWithoutComposite | FolderWithoutComposite)[] = []

	constructor(public name: string) {}

	add(child: TextFileWithoutComposite | FolderWithoutComposite): void {
		this.children.push(child)
	}

	showDetails(): void {
		console.log(`${this.name}`)
		this.children.forEach((child) => child.showDetails())
	}
}

/* Usage */

const folder1WithoutComposite = new FolderWithoutComposite('documents')
const file1WithoutComposite = new TextFileWithoutComposite('report.txt')
const file2WithoutComposite = new TextFileWithoutComposite('presentation.pptx')
const folder2WithoutComposite = new FolderWithoutComposite('images')

folder1WithoutComposite.add(file1WithoutComposite)
folder1WithoutComposite.add(file2WithoutComposite)
folder1WithoutComposite.add(folder2WithoutComposite)

folder1WithoutComposite.showDetails()
/* 
  Output:
  documents
    report.txt
    presentation.pptx
  images
  */

/* With Composite */

// Interface for File System Components (both files and folders will implement this)
interface FileSystemComponent {
	getName(): string
	showDetails(): void
}

// TextFile class implements the FileSystemComponent interface
class TextFile implements FileSystemComponent {
	constructor(public name: string) {}

	getName(): string {
		return this.name
	}

	showDetails(): void {
		console.log(`    ${this.name}`)
	}
}

// Folder class implements the FileSystemComponent interface and can contain other components
class Folder implements FileSystemComponent {
	private children: FileSystemComponent[] = []

	constructor(public name: string) {}

	add(child: FileSystemComponent): void {
		this.children.push(child)
	}

	getName(): string {
		return this.name
	}

	showDetails(): void {
		console.log(`${this.name}`)
		this.children.forEach((child) => child.showDetails())
	}
}

/* Usage */

const rootFolder = new Folder('main_folder')
const textFile = new TextFile('document.txt')
const excelFile = new TextFile('report.xlsx')
const subFolder = new Folder('images')

rootFolder.add(textFile)
rootFolder.add(excelFile)
rootFolder.add(subFolder)

rootFolder.showDetails()
/* 
  Output:
  main_folder
    document.txt
    report.xlsx
  images
  */
