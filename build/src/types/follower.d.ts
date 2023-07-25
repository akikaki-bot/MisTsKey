import { ISO8601 } from "../components/message";
import { Self } from "../components/self";
export interface Follower {
    id: string;
    createAt: ISO8601;
    followeeId: string;
    followerId: string;
    follower: Self;
}
