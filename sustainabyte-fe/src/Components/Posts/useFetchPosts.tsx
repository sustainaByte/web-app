import {useEffect, useState} from "react";

const useFetchPosts = () => {
    const [posts, setPosts] = useState([])
    const [err, setErr] = useState(null)

    useEffect(() => {
        fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/posts',
            {
                method: "GET",
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

    if (err) {
        return err
    }

    return posts
}

export const useFetchEvents = () => {
    const [events, setEvents] = useState([])
    const [err, setErr] = useState(null)

    useEffect(() => {
        fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/events', {
            method: "GET",
        })
            .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                return {'err': 'There was a problem loading posts!'}
            }
        })
            .then(data => setEvents(data))
            .catch(err => setErr(err))
    }, []);

    if (err) {
        return err
    }

    return events
}

export default useFetchPosts
