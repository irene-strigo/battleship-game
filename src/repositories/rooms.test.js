import {RoomsRepository} from "./rooms.js";

describe('users repo', () => {
    test('should create singleton repo', () => {
        const instanceOne = new RoomsRepository()
        const instanceTwo = new RoomsRepository()

        expect(instanceOne).toBeInstanceOf(RoomsRepository)
        expect(instanceTwo).toBeInstanceOf(RoomsRepository)
        expect(instanceOne).toBe(instanceTwo)
    });

    test('should add user with proper PK', () => {
        const room = {};
        const roomsRepo = new RoomsRepository()
        const savedRoom = roomsRepo.insert(room)

        expect(savedRoom).toMatchObject(room)
        expect(savedRoom.indexRoom).toBe(1)
    });

});
