class Repository{
    constructor(storage){
        this.storage = storage
    }

    insert(data){
        let user = {}
        user.name = data.name;
        user.password = data.password;
        user.score = 0;
        user.index = this.storage.users.push(user)
    }

    update(data){}

    getAll(){}
    getOne(id){}
    deleteOne(id){}

    storage = {
        users:[
            {login: '',
                password: '',
                score: 0,
                index:0
            },
        ],
        gameRooms:[
            {indexRoom:0,
                roomUsers:[{
                    name: '',
                    index: 0,
                }]
            },
        ],
        ships:[{
            userIndex:0,
            position:{x:0,y:0},
            direction:'up',
            length:'',
            type:'large'
        }],
        games:[{
            idGame:0,
            gameUsers:[{}]      ,
            gameShips:[{}]

        }]
    }
}
