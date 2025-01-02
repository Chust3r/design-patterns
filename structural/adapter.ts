/*

Definition:

The Adapter pattern allows incompatible interfaces to work together. It acts as a bridge, converting one interface to another, so that a client can interact with it seamlessly. This pattern is particularly useful when integrating third-party libraries or legacy code that doesn't fit into the desired interface.

When to use it:

- When you need to integrate code with incompatible interfaces.
- When working with legacy systems that require a new interface.
- When you want to provide a unified interface to a set of classes with different interfaces.

Practical Example: Adapter for Media Players

Imagine you're building a media player application, and you have two types of media players: an `MP3Player` and a `VLCPlayer`. Each one has a different way of playing audio files, but you want to create a unified interface so users can play music using both players without worrying about the differences.

Problem:

The `MP3Player` and `VLCPlayer` classes have different interfaces, and they can't be used interchangeably without modifying their code. Without the Adapter pattern, you'd need to rewrite a lot of logic in your application to make both players compatible with the same interface.

Solution:

The Adapter pattern allows you to create an adapter for each player that converts their different interfaces into a unified one. This way, your application can interact with both players in the same way.

*/

/* Without Adapter */

class MP3Player {
	playMP3(file: string): void {
		console.log(`Playing MP3 file: ${file}`)
	}
}

class VLCPlayer {
	playVLC(file: string): void {
		console.log(`Playing VLC file: ${file}`)
	}
}

/* Usage */

const mp3Player = new MP3Player()
const vlcPlayer = new VLCPlayer()

mp3Player.playMP3('song.mp3') //→ Playing MP3 file: song.mp3

vlcPlayer.playVLC('movie.vlc') //→ Playing VLC file: movie.vlc

/* With Adapter */

interface MediaPlayer {
	play(file: string): void
}

class MP3Adapter implements MediaPlayer {
	constructor(private mp3Player: MP3Player) {}

	play(file: string): void {
		this.mp3Player.playMP3(file)
	}
}

class VLCAdapter implements MediaPlayer {
	constructor(private vlcPlayer: VLCPlayer) {}

	play(file: string): void {
		this.vlcPlayer.playVLC(file)
	}
}

/* Usage */

const adaptedMP3Player = new MP3Adapter(new MP3Player())
const adaptedVLCPlayer = new VLCAdapter(new VLCPlayer())

adaptedMP3Player.play('song.mp3') //→ Playing MP3 file: song.mp3

adaptedVLCPlayer.play('movie.vlc') //→ Playing VLC file: movie.vlc
