import {useAuth} from "./login";
import {useEffect, useState} from "react";

const useFetchUser = (authKey: string) => {
    const [user, setUser] = useState([])
    const [err, setErr] = useState('')

    useEffect(() => {
        authKey ?
        fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/users/current',
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authKey}`,
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return {'err': 'There was a problem loading user!'}
                }
            })
            .then(data => setUser(data))
            .catch(err => setErr(err.message))
            : setErr("Missing authentication token!")
    }, [authKey])

    if (err) {
        return err
    }

    return user
}

export default useFetchUser