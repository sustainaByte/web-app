import useFetchUser from "../Login/useFetchUser";
import {useAuth} from "../Login/login";
import {useNavigate} from "react-router-dom";

export const paypalOptions = {
    "clientId": "AVkPTMTMdAMwetNdDWRwdPELXj6zCVjXWpNKFeb8iQ9hHSl6wslQCCw99IAG2zbSAmLt0g9lshYHNjVx",
    currency: "EUR",
    intent: "capture"
}

export const createOrder = async (data: any, actions: any) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: "100",
                },
            },
        ],
    });
}

export const onApprove = (
    data: any,
    actions: any,
    authKey: string,
    navigate: (path: string) => void
) => {
    return actions.order
        .capture()
        .then((details: any) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        })
        .then(() => {
            fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/users/current', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authKey}`,
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return { 'err': 'There was a problem loading user!' };
                    }
                })
                .then((user) => {
                    fetch(`https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/users/${user.data._id}/upgrade`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authKey}`,
                        },
                        body: JSON.stringify({
                            role: "premium"
                        })
                    })
                        .then(() => {
                            navigate('/settings');
                        });
                });
        });
};