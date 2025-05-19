import {Repository} from "./repository.js";

export class RoomsRepository extends Repository {
    get primaryKeyField () {
        return 'indexRoom'
    }
}

export default new RoomsRepository()
