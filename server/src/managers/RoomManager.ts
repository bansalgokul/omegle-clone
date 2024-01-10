import { User } from "./UserManager"

let GLOBAL_ROOM_ID = 1

export interface Room {
	user1: User
	user2: User
	roomID: string
}

export class RoomManager {
	private rooms: Map<string, Room>
	constructor() {
		this.rooms = new Map<string, Room>()
	}

	createRoom(user1: User, user2: User) {
		const roomID = this.generate()

		this.rooms.set(roomID, {
			user1,
			user2,
			roomID,
		})

		user1.socket.emit("send-offer", {
			roomID,
		})
	}

	onOffer(roomID: string, sdp: string) {
		const user2 = this.rooms.get(roomID)?.user2
		user2?.socket.emit("offer", {
			sdp,
		})
	}

	onAnswer(roomID: string, sdp: string) {
		const user1 = this.rooms.get(roomID)?.user1
		user1?.socket.emit("offer", {
			sdp,
		})
	}

	generate() {
		return (GLOBAL_ROOM_ID++).toString()
	}
}
