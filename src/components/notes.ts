import { Client } from "..";
import { GETPOST } from "../posts";
import { getMentionedNotesOption, searchNotesOption } from "../types";
import { AccessToken, GlobalNoteIdParam } from "../types/reaction";
import { WebSocketState } from "../types/wsState";
import { 
    BaseNote, 
    Note , 
    TimeLineMessage 
} from "./";

// Client.Notes
export class Notes {

    private client : Client

    constructor(client : Client) {
        this.client = client
    }

    async searchNotes(searchQuery : string , options ?: Omit<searchNotesOption, "searchQuery">) : Promise<Note[]>{
        const ResData = await GETPOST<AccessToken & searchNotesOption, BaseNote[]>(`https://${this.client.getHost}/notes/search`, {
            i : this.client.token,
            ...Object.assign({searchQuery : searchQuery}, options)
        })
        return ResData.data.map(v => new Note(v))
    }

    async getMentionedNotes( options ?: getMentionedNotesOption ) : Promise<Note[]> {
        const ResData = await GETPOST<AccessToken & getMentionedNotesOption , BaseNote[]>(`https://${this.client.getHost}/notes/mentions`, {
            i : this.client.token,
            ...options
        })
        return ResData.data.map(v => new Note(v))
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