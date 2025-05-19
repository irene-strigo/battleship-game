import RoomsRepository from "./rooms.js";

describe('users repo', () => {

    test('should add user with proper PK', () => {
        const room = {};
        const savedRoom = RoomsRepository.insert(room)

        expect(savedRoom).toMatchObject(room)
        expect(savedRoom.indexRoom).toBe(1)
    });

});
