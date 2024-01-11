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
                    value: "10",
                },
            },
        ],
    });
}

export const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
        const name = details.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
    });
}