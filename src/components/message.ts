import { User } from "./user"

export interface Message {
    type : "channel",
    body : MessageBody
}
/**
 * # MessageBody
 * 
 *  メッセージデータです。
 * 
 * ## 独自の型
 * ```js
 *  IsRenoteMessage : boolean
 * ```
 */
export interface MessageBody {
    id : string
    type : string
    body : Note
    IsRenoteMessage : boolean
}

/**
 * # Note
 * 
 * ノート型。
 * 
 * いろんなところに使われてるよ。
 * 
 * More Info : [Misskey Hub](https://misskey-hub.net/docs/api/entity/note.html)
 * 
 * ※拡張済み
 */
export interface Note {
    BodyId : string
    IsRenoteMessage : boolean
    id : string
    createdAt : ISO8601
    userId : string
    user : User
    /**
     * # Notice
     * textはRenoteなど本文がない場合に `null` になります。 
     */
    text : string | null
    cw : string | null
    visibility : Visibility
    localOnly : boolean
    renoteCount : number
    repliesCount : number
    reactions : object
    reactionEmojis : object
    emojis : object
    tags : Array<any>
    fileIds : Array<string>,
    files : Array<any>,
    replyId : any
    renoteId : any,
    mentions : Array<any>
    uri : string
}
export type Visibility = "public" | "home" | "followers" | "specified"
export type ISO8601 = string

/**
 * {
  type: 'channel',
  body: {
    id: 'b27875cf-2469-4d46-be57-feb9c117525a',
    type: 'note',
    body: {
      id: '9h7018wgue',
      createdAt: '2023-07-15T03:14:58.000Z',
      userId: '8ulsskzrwd',
      user: [Object],
      text: 'Por encima de su cadáver\n' +
        '\n' +
        'Por Bob Torres\n' +
        '\n' +
        'Anarquista.\n' +
        '\n' +
        'Sinopsis\n' +
        'Sugiere a la gente de izquierdas que la cuestión de los animales debería ser incluida entre las luchas por la liberación y, una vez que dejen de reírse, verás que casualmente no te toman en serio. Con un enfoque basado en el trabajo, la propiedad y la “vida” de las mercancías, Por encima de su cadáver pretende dar claves para entender la profunda naturaleza de la dominación, el poder y la jerarquía, explorando las intersecciones entre las opresiones humana y animal y su relación con las dinámicas de explotación propias del capitalismo. Combinando como tuercas y tornillos la economía política marxista, una visión anarquista pluralista y un \n' +
        '\n' +
        '#Govegan \n' +
        '#veganism \n' +
        '#veganismo \n' +
        '#izquierda \n' +
        '#marxismo \n' +
        '\n' +
        '@vegan@a.gup.pe \n' +
        '1/2',
      cw: null,
      visibility: 'public',
      localOnly: false,
      renoteCount: 0,
      repliesCount: 0,
      reactions: {},
      reactionEmojis: {},
      emojis: {},
      tags: [Array],
      fileIds: [],
      files: [],
      replyId: null,
      renoteId: null,
      mentions: [Array],
      uri: 'https://social.politicaconciencia.org/users/SofiaK/statuses/110715921930636829',
      url: 'https://social.politicaconciencia.org/@SofiaK/110715921930636829'
    }
  }
}
 */