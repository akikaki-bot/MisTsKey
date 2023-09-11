import { ChannelType } from "../components";
export interface HelloWorld {
    type: "connect";
    body: {
        channel: ChannelType;
        id: string;
        params?: object;
    };
}
