export interface User {
    id: string;
    createdAt: string;
    username: string;
    host: string | null;
    name: string;
    onlineStatus: onlineStatus;
    avaterUrl: string;
    avatarBlurhash: string;
}
export type onlineStatus = "online" | "active" | "offline" | "unknown";
