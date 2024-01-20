export interface Post { 
        "title": string,
        "content": string,
        "creatorId": string,
        "comments": string,
        "kudos": string[],
        "mediaUrl": { type: string; data: number[]; }[]
        "createdAt"?: string,
        "updatedAt"?: string,
        "_id"?: string,
        "__v"?: number
    }