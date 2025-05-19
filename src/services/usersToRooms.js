import {AbstractService} from "./abstractService.js";
import UsersToRoomsRepository from "../repositories/usersToRooms.js";

export class UsersToRoomsService extends AbstractService {

    constructor() {
        super()
        this.usersToRoomsRepository = UsersToRoomsRepository
    }

    defaultEntity = {
        userId: 0,
        roomId: 0,
    }

    privateFields = []

    async add(userId, roomId) {
        const entity = {...this.defaultEntity, userId, roomId}

        try {
            if (!entity.userId) {
                throw new Error('userId is required');
            }

            if (!entity.roomId) {
                throw new Error('roomId is required');
            }

            const currentUsersCount = await this.usersToRoomsRepository.getAllByFieldValue('roomId', roomId)
            if (currentUsersCount.length >= 2) {
                throw new Error('room is full');
            }

            const savedEntity = await this.usersToRoomsRepository.insert(entity)

            return {...this.filterPrivateFields(savedEntity), ...this.getErrorFields()}
        } catch (error)  {
            return {...this.filterPrivateFields(entity), ...this.getErrorFields(error.toString())}
        }
    }

    async getUsersInRoom(roomId) {
        return this.usersToRoomsRepository.getAllByFieldValue('roomId', roomId)
    }
}
