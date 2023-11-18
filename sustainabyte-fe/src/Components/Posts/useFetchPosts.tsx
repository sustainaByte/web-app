import {useEffect, useState} from "react";

const useFetchPosts = () => {
    const [posts, setPosts] = useState({})
    const [err, setErr] = useState(null)

    useEffect(() => {
        fetch('https://0176-92-180-9-53.ngrok-free.app/posts',
            {
                method: "get",
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {'err': 'There was a problem loading posts!'}
                }
            })
            .then(data => setPosts(data))
            .catch(err => setErr(err))
    }, [])

    if (err)
        return err

    return posts
}

export default useFetchPosts