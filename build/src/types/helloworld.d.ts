import { ChannelType } from "../components/base";
export interface HelloWorld {
    type: "connect";
    body: {
        channel: ChannelType;
        id: string;
        params?: {};
    };
}
