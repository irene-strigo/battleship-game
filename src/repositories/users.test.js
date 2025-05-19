import UsersRepository from "./users.js";

describe('users repo', () => {
    test('should add user', () => {
        const user = {name: 'John', password: '123456'};
        const savedUser = UsersRepository.insert(user)

        expect(savedUser).toMatchObject(user)
        expect(savedUser.index).toBe(1)
    });

    test('should add many users', () => {
        const user = {name: 'John', password: '123456'};
        const savedUser1 = UsersRepository.insert(user)
        const savedUser2 = UsersRepository.insert(user)

        expect(savedUser1).toMatchObject(user)
        expect(savedUser1.index).toBe(2)

        expect(savedUser2).toMatchObject(user)
        expect(savedUser2.index).toBe(3)
    });

    test('should return all users', () => {
        const users = UsersRepository.list()
        expect(users).toHaveLength(3)
    });

    test('should return user by PK', () => {
        const user = UsersRepository.getByPk(1)
        expect(user.index).toBe(1)
    });

    test('should return undefined if user not found by PK', () => {
        const user = UsersRepository.getByPk(1231)
        expect(user).toBe(undefined)
    });

    test('should update user by PK', () => {
        const user = UsersRepository.update(1, {name: 'Vassiliy'})
        expect(user.index).toBe(1)
        expect(user.name).toBe('Vassiliy')
        expect(user.password).toBe('123456')
    });

    test('should return undefined if try to update user with unexistent PK', () => {
        const user = UsersRepository.update(123, {name: 'Vassiliy'})
        expect(user).toBe(undefined)
    });

    test('should delete user by PK', () => {
        UsersRepository.delete(1)

        const users = UsersRepository.list()
        expect(users).toHaveLength(2)

        const indexes = users.map(user => user.index)
        expect(indexes.includes(1)).toBeFalsy()
    });

    test('should not delete user with unexistent PK', () => {
        UsersRepository.delete(123)

        const users = UsersRepository.list()
        expect(users).toHaveLength(2)

        const indexes = users.map(user => user.index)
        expect(indexes.includes(123)).toBeFalsy()
    });
});
