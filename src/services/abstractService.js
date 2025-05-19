export class AbstractService {
    defaultEntity = {}

    privateFields = []

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

    composeAnswer(type, result) {
        return {
            type: type,
            data: JSON.stringify(result),
            id: 0
        }
    }
}
