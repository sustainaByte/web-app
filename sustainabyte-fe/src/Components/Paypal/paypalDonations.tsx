import React from "react";
import {createOrder, onApprove, paypalOptions} from "./paypalHelper";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {useAuth} from "../Login/login";
import {useNavigate} from "react-router-dom";

// @ts-ignore
const PaypalDonate = ({postID, collectedMoney}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    const navigate = useNavigate()
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={(data, actions) => onApprove(data, actions, authKey?.data?.jwtToken, navigate, postID, collectedMoney)}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalDonate;