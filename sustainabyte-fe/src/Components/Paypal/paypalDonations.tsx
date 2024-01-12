import React from "react";
import {createOrder, onApprove, paypalOptions} from "./paypalHelper";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
const PaypalDonate = () => {
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    )
}

export default PaypalDonate;