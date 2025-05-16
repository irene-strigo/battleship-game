import {UsersRepository} from "../repositories/users.js";

export class UsersService {
    usersMap = {}

    constructor() {
        if (UsersService._instance) {
            return UsersService._instance
        }
        UsersService._instance = this;
        this.usersMap = {}
        this.usersRepository = new UsersRepository()
    }

    defaultUser = {
        name: '',
        password: '',
        score: 0
    }

    privateFields = ['password', 'score']

    getErrorFields (errorText) {
        return {
            error: !!errorText,
            errorText: errorText || ''
        }
    }

    filterPrivateFields(userEntity) {
        return Object.keys(userEntity).reduce((acc, key) => {
            if (!this.privateFields.includes(key)) {
                acc[key] = userEntity[key]
            }
            return acc
        }, {})
    }

    register(user, wsUserId) {
        const userEntity = {...this.defaultUser, ...user}

        try {
            if (!userEntity.name || userEntity.name.length < 5) {
                throw new Error('User Name is required or too short');
            }

            if (!userEntity.password || userEntity.password.length < 5) {
                throw new Error('User Passwords is required or too short');
            }

            const savedUser = this.usersRepository.insert(userEntity)

            this.usersMap[wsUserId] = savedUser.index

            return {...this.filterPrivateFields(savedUser), ...this.getErrorFields()}
        } catch (error)  {
            return {...this.filterPrivateFields(userEntity), ...this.getErrorFields(error.toString())}
        }
    }

    getUserByWsId(wsId) {
        return this.usersRepository.getByPk(this.usersMap[wsId])
    }
}
