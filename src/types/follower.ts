/**
 * 		id: '9h8a769lia',
		createdAt: '2023-07-16T00:47:16.857Z',
		followeeId: '9h7a7wps6k',
		followerId: '9aqev0ecjl',
		follower: {
 */

import { ISO8601 } from "../components/message"
import { Self } from "../components/self"



export interface Follower {
    id : string
    createAt : ISO8601
    followeeId : string
    followerId : string
    follower : Self
}


