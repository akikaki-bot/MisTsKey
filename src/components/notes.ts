import { Client } from "..";
import { GETPOST } from "../posts/post";
import { AccessToken, GlobalNoteIdParam } from "../types/reaction";
import { WebSocketState } from "../types/wsState";
import { Note } from "./message";
import { TimeLineMessage } from "./timelineMessage";

// Client.Notes
export class Notes {

    private client : Client

    constructor(client : Client) {
        this.client = client
    }

    async fetch( id : string ) : Promise<TimeLineMessage> {
        const Message = this.client.cache.get(id)
        if(!Message && (this.client.state === WebSocketState.connected)) {
           const RESData = await GETPOST<AccessToken & GlobalNoteIdParam, Note>(`https://${this.client.getHost}/notes/show`, {
                i : this.client.token,
                noteId : id
            })
            return new TimeLineMessage(
                { 
                    type : "channel", 
                    body : { 
                        id : id, 
                        type : "fetchedMessage", 
                        body : RESData.data 
                    } 
                }, this.client)
        } else {
            return Message
        }
    }

    get( id : string ) : TimeLineMessage | null {
        const Message = this.client.cache.get(id) ?? null
        return Message
    }
}