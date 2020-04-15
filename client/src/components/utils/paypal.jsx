import React, { Component } from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

export default class Paypal extends Component {
  
  render() {

    const onSuccess = (payment) => {
      // {
      //   "paid":true,
      //   "cancelled":false,
      //   "payerID":"NRDZ2B67BAA7G",
      //   "paymentID":"PAYID-L2KDMXQ3RM70747WN964824A",
      //   "paymentToken":"EC-74W924990R396722F",
      //   "returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-L2KDMXQ3RM70747WN964824A&token=EC-74W924990R396722F&PayerID=NRDZ2B67BAA7G",
      //   "address":{
      //     "recipient_name":"John Doe",
      //     "line1":"1 Main St",
      //     "city":"San Jose",
      //     "state":"CA",
      //     "postal_code":"95131",
      //     "country_code":"US"
      //   },
      //   "email":"sb-qfrop1443988@personal.example.com"
      // }
      // console.log(JSON.stringify(payment))
      this.props.onSuccess(payment)
    }

    const onCancle = (data) => {
      console.log(JSON.stringify(data))
    }

    const onError = (err) => {
      console.log(JSON.stringify(err))
    }

    let env = 'sandbox'
    let currency = 'USD'
    let total = this.props.toPay
    const client = {  
      sandbox: 'ASTO5g42rtmQdx4cbyhOZFvATtq0UPasNJnvyQ7_hMXoqhqV0cNDcu5FitH6NVjisPGE6UsW4MGIKxX2',
      production: ''
    }

    

    return (
      <div>
        <PaypalExpressBtn
          env = {env}
          client = {client}
          currency = {currency}
          total = {total}
          onError = {onError}
          onSuccess = {onSuccess}
          onCancle = {onCancle}
          style = {{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    )
  }
}
