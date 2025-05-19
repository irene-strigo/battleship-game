import UsersRepository from "../repositories/users.js";
import {AbstractService} from "./abstractService.js";

export class UsersService extends AbstractService {

    constructor() {
        super()
        this.usersRepository = UsersRepository
    }

    defaultEntity = {
        name: '',
        password: '',
        score: 0,
        wsUserId: null,
    }

    privateFields = ['password', 'score', 'wsUserId']

    async register(user, wsUserId) {
        const userEntity = {...this.defaultEntity, ...user, wsUserId}

        try {
            if (!userEntity.name || userEntity.name.length < 5) {
                throw new Error('User Name is required or too short');
            }

            if (!userEntity.password || userEntity.password.length < 5) {
                throw new Error('User Passwords is required or too short');
            }

            const savedUser = await this.usersRepository.insert(userEntity)

            const result = {...this.filterPrivateFields(savedUser), ...this.getErrorFields()}
            return this.composeAnswer('reg', result)
        } catch (error)  {
            const result = {...this.filterPrivateFields(userEntity), ...this.getErrorFields(error.toString())}
            return this.composeAnswer('reg', result)
        }
    }

    async getUserByWsId(wsId) {
        const users = await this.usersRepository.getAllByFieldValue('wsUserId', wsId)
        return users[0]
    }

    async getByPk(pkValue) {
        return this.usersRepository.getByPk(pkValue)
    }
}
