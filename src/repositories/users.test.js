import {UsersRepository} from "./users.js";

describe('users repo', () => {
    test('should create singleton repo', () => {
        const instanceOne = new UsersRepository()
        const instanceTwo = new UsersRepository()

        expect(instanceOne).toBeInstanceOf(UsersRepository)
        expect(instanceTwo).toBeInstanceOf(UsersRepository)
        expect(instanceOne).toBe(instanceTwo)
    });

    test('should add user', () => {
        const user = {name: 'John', password: '123456'};
        const usersRepo = new UsersRepository()
        const savedUser = usersRepo.insert(user)

        expect(savedUser).toMatchObject(user)
        expect(savedUser.index).toBe(1)
    });

    test('should add many users', () => {
        const user = {name: 'John', password: '123456'};
        const usersRepo = new UsersRepository()
        const savedUser1 = usersRepo.insert(user)
        const savedUser2 = usersRepo.insert(user)

        expect(savedUser1).toMatchObject(user)
        expect(savedUser1.index).toBe(2)

        expect(savedUser2).toMatchObject(user)
        expect(savedUser2.index).toBe(3)
    });

    test('should return all users', () => {
        const usersRepo = new UsersRepository()
        const users = usersRepo.list()
        expect(users).toHaveLength(3)
    });

    test('should return user by PK', () => {
        const usersRepo = new UsersRepository()
        const user = usersRepo.getByPk(1)
        expect(user.index).toBe(1)
    });

    test('should return undefined if user not found by PK', () => {
        const usersRepo = new UsersRepository()
        const user = usersRepo.getByPk(1231)
        expect(user).toBe(undefined)
    });

    test('should update user by PK', () => {
        const usersRepo = new UsersRepository()
        const user = usersRepo.update(1, {name: 'Vassiliy'})
        expect(user.index).toBe(1)
        expect(user.name).toBe('Vassiliy')
        expect(user.password).toBe('123456')
    });

    test('should return undefined if try to update user with unexistent PK', () => {
        const usersRepo = new UsersRepository()
        const user = usersRepo.update(123, {name: 'Vassiliy'})
        expect(user).toBe(undefined)
    });

    test('should delete user by PK', () => {
        const usersRepo = new UsersRepository()
        usersRepo.delete(1)

        const users = usersRepo.list()
        expect(users).toHaveLength(2)

        const indexes = users.map(user => user.index)
        expect(indexes.includes(1)).toBeFalsy()
    });

    test('should not delete user with unexistent PK', () => {
        const usersRepo = new UsersRepository()
        usersRepo.delete(123)

        const users = usersRepo.list()
        expect(users).toHaveLength(2)

        const indexes = users.map(user => user.index)
        expect(indexes.includes(123)).toBeFalsy()
    });
});
