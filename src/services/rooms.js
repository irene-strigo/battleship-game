import UsersRepository from "../repositories/users.js";
import RoomsRepository from "../repositories/rooms.js";
import {AbstractService} from "./abstractService.js";
import {UsersToRoomsService} from "./usersToRooms.js";
import {UsersService} from "./users.js";

export class RoomsService extends AbstractService {

    constructor() {
        super()
        this.roomsRepository = RoomsRepository
        this.usersService = new UsersService()
        this.usersToRoomsService = new UsersToRoomsService()
    }

    async createRoom(_data, _wsUserId) {
        try {
            const createdRoom = this.roomsRepository.insert({})
            const result = {...this.filterPrivateFields(createdRoom), ...this.getErrorFields()}
            return this.composeAnswer('create_room', result)
        } catch (error) {
            const result = {...this.filterPrivateFields(this.defaultEntity), ...this.getErrorFields(error.toString())}
            return this.composeAnswer('create_room', result)
        }
    }

    async updateRoom(_data, _wsUserId) {
        const rooms = this.roomsRepository.list()
        const result = []
        for (const room of rooms) {
            const users = await this.usersToRoomsService.getUsersInRoom(room.indexRoom)
            if (users.length > 0) {
                const roomResult = {
                    roomId: room.indexRoom,
                    roomUsers: []
                }
                for (const roomUser of users) {
                    const user = await this.usersService.getByPk(roomUser.userId)
                    roomResult.roomUsers.push({
                        name: user.name,
                        index: user.index
                    })
                }
                result.push(roomResult)
            }
        }
        return this.composeAnswer('update_room', result)
    }

    async addUserToRoom(data, wsUserId) {
        const user = await this.usersService.getUserByWsId(wsUserId)
        if (!user) {
            throw new Error('user does not exist')
        }

        const result = await this.usersToRoomsService.add(user.index, data.indexRoom || 1)
        return this.composeAnswer('add_user_to_room', result)
    }

}
