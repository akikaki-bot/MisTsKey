import { ChannelType } from "./base";
export interface HelloWorld {
    type: "connect";
    body: {
        channel: ChannelType;
        id: string;
        params?: {};
    };
}
