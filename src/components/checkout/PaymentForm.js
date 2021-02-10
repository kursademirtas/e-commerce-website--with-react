import React from 'react'
import { Typography,  Divider, Button} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)


const PaymentForm = ({checkoutToken, shippingData, next, emptyCart}) => {
	console.log(shippingData)
	const handleSubmit = async (event, elements, stripe) => {
		
		event.preventDefault();
		if(!stripe || !elements) return;
		const cardElement = elements.getElement(CardElement);
	

			const orderData= {
				name: shippingData.firstName,
				lastName: shippingData.lastName,
				addres: shippingData.address,
			

		}
		
		next(orderData)
	}
	return (
		<>
			<Review checkoutToken={checkoutToken} />
			<Divider/>
			<Typography variant="h6" style={{margin:"20px 0"}}>Payment Method</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({elements, stripe}) => (
						<form onSubmit={(e) => handleSubmit(e,elements, stripe)}>
							<CardElement/>
								<br/> <br/>
								<div style={{display:'flex', justifyContent:"space-between"}}>
									<Button>Back</Button>
									<Button type="submit" variant="contained" disabled={!stripe} color="primary">
										Pay {checkoutToken.live.subtotal.formatted_with_symbol}
									</Button>
								</div>

							
						</form>
					)}
				</ElementsConsumer>
			</Elements>

		</>
	)
}

export default PaymentForm
