export const addKudos = async (token: any, postId: any) => {
    try {
        return await fetch(`https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/posts/${postId}/like`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.data.jwtToken}`,
            },
        })
            .then(r => r.json())
    } catch (error: any) {
        console.log("Error adding kudos!")
    }
}