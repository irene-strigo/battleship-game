export class Repository {
    storage = []

    constructor() {

    }

    get primaryKeyField () {
        return 'index'
    }

    insert(entity){
        const entityClone = {...entity}
        entityClone[this.primaryKeyField] = this.storage.push(entityClone)
        return {...entityClone}
    }

    list() {
        return this.storage.map(item => ({...item}))
    }

    getByPk(primaryKeyValue){
        const items = this.getAllByFieldValue(this.primaryKeyField, primaryKeyValue)
        return items.length ? items[0] : undefined
    }

    getAllByFieldValue(field, value){
        const entities = this.storage.filter(item => item[field] === value)
        return entities.map(item => ({...item}))
    }

    update(primaryKey, partialEntity) {
        const entity = this.storage.find(item => item[this.primaryKeyField] === primaryKey)
        if (!entity) {
            return undefined
        }

        for (const key in partialEntity) {
            entity[key] = partialEntity[key]
        }

        return {... entity}
    }

    delete(primaryKey){
        const entity = this.storage.find(item => item[this.primaryKeyField] === primaryKey)
        if (!entity) {
            return
        }
        this.storage.splice(entity[this.primaryKeyField] -1, 1)
    }
}
