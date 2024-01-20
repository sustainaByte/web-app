import { useEffect, useState } from "react";

import { Statistics } from "../Statistics/statistics";

const useFetchStatistics = () => {
    const [statistics, setStatistics] = useState<Statistics>()
    const [err, setErr] = useState(null)

    useEffect(() => {
        fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/statistics',
            {
                method: "GET",
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return { 'err': 'There was a problem loading statistics!' }
                }
            })
            .then(data => setStatistics(data.data))
            .catch(err => setErr(err))
    }, [])

    if (err) {
        return err
    }

    return statistics
}
export default useFetchStatistics
