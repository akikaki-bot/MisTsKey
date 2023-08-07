import {
    ISO8601 , 
    Self
} from "../components"



export interface Follower {
    id : string
    createAt : ISO8601
    followeeId : string
    followerId : string
    follower : Self
}


