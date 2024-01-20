import { useEffect, useState } from "react";

import { Statistics } from "../Statistics/statistics";

const useFetchCreateStatistics = () => {
    useEffect(() => {
        fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/statistics',
            {
                method: "POST",
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    return { 'err': 'There was a problem creating the post!' }
                }
            })
    }, [])
}
export default useFetchCreateStatistics