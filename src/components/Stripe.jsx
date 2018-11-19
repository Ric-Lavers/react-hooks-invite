import React, { Component } from 'react'
// import StripeCheckout from 'react-stripe-checkout';
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';

import { SERVER_URL } from '../api/root'

const Publishable_key = 'pk_test_h6yLt71utyPK2SJMsPxCiju1'
const Secret_key = 'sk_test_iv2ekyOIcYlqljndnf2gyK1s'

class CheckoutForm extends Component {
  state = {
    complete: false
  }

  submit = async (ev) => {

    let tokenData = await this.props.stripe.createToken({name: "Name"});
console.log(tokenData)

    let response = await fetch(SERVER_URL + "/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: tokenData.token.id
    });
  
    if (response.ok) {
      console.log(response.body)
      this.setState({complete: true})
    };
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement hidePostalCode />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
/* 
class StripeWrapper extends Component {
  render() {
    return (
      <StripeProvider apiKey={Publishable_key}>
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default StripeWrapper */


/* 
class TakeMoney extends React.Component {
  state = {
    dollars: 0,
  }

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      console.log(response)
      // response.json().then(data => {
      //   alert(`We are in business, ${data.email}`);
      // });
    });
  }
 
  // ...
 
  render() {
    let { dollars } = this.state

    return (
      <>
        <input
          type='number'
          onChange={ ({target}) => this.setState({ dollars: target.value * 100  }) }
        />
        <StripeCheckout
          token={this.onToken}
          stripeKey={Publishable_key}
          amount={dollars}
        />
      </>
    )
  }
}

export default TakeMoney */
