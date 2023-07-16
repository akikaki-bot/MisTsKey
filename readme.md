# Misskey.ts

Misskey.io等、MisskeyAPI専用APIラッパーです。

## Install

- もうちょっとまってね

## How to use

```ts

import { Client } from "../../something/file"

const client = new Client("Your Access Token", "globalTimeline")

client.on('ready', () => {
    console.log("Logined at : "+client.i.username)

    client.i.note('TypeScript製 Misskey.ts が産声を上げたぞ！')
})

client.on('timelineCreate', (message) => {

    if(message.message.text.match(/!misskeyTSBot/)){
        message.message.reply('やっはろー！')
    }

})

```

## License

MIT Licence.
