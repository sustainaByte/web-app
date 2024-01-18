export interface Post {
        "title": string,
        "content": string,
        "creatorId": string,
        "kudos": string[],
        "mediaUrl": string,
        "mediaFile"?: Blob | null,
        "createdAt"?: string,
        "updatedAt"?: string,
        "_id"?: string,
        "__v"?: number
    }