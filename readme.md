# MisTsKey

Misskey.io等、Misskey系統SNS API専用APIラッパーです。

## Install

- もうちょっとまってね

## How to use

```ts

import { Client } from "../../something/file"

const client = new Client("Your Access Token", "globalTimeline")

client.on('ready', () => {
    console.log("Logined at : "+client.i.username)

    client.i.note('MisTsKeyでBotが産声を上げたぞ！')
})

client.on('timelineCreate', (message) => {

    if(message.message.text.match(/!MisTsKey/)){
        message.message.reply('やっはろー！')
    }

})

```

## License

MIT Licence.
