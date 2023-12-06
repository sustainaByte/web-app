export interface Post { 
        "title": string,
        "content": string,
        "creatorId": string,
        "kudos": number,
        "mediaUrl": string[],
        "createdAt"?: string,
        "updatedAt"?: string,
        "_id"?: string,
        "__v"?: number
    }