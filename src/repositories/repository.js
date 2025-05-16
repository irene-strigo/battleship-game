export class Repository {
    storage = []

    primaryKeyField = 'index'

    constructor(){
        if (Repository._instance) {
            return Repository._instance
        }
        Repository._instance = this;

        this.storage = []
    }

    insert(entity){
        const entityClone = {...entity}
        entityClone[this.primaryKeyField] = this.storage.push(entityClone)
        return {...entityClone}
    }

    list() {
        return this.storage.map(item => ({...item}))
    }

    getByPk(primaryKey){
        const entity = this.storage.find(item => item[this.primaryKeyField] === primaryKey)
        return entity ? {... entity} : undefined
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
