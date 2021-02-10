import React, {useState, useEffect} from 'react'
import { Typography , Stepper, Step, StepLabel,  Paper} from '@material-ui/core';
import useStyles from '../../styles/checkout';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';

import {commerce} from '../../lib/commerce';

const steps = ["Shipping address", "Payment Details"];

const Checkout = ( { cart,emptyCart }) => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [shippingData, setShippingData] = useState({});
	const [checkoutToken, setCheckoutToken] = useState(null)

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
				setCheckoutToken(token);
			}catch (error) {
				console.error(error)
			}
		}
		generateToken()
	}, [cart]);



	const paymentStep =  (data) => {
		setShippingData(data);
		setActiveStep(activeStep+1)
		emptyCart()

	}

	
	
	console.log(shippingData)
	const Form = () => activeStep === 0 ? <AddressForm checkoutToken = {checkoutToken} next={paymentStep}/> :
										  <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} next={paymentStep} />;
	
		const Confirmation = () => (
		<div>
			<Typography variant="h5">Thank you for your purschase, {(shippingData.name + " "  + shippingData.lastName).toUpperCase()} </Typography>
		</div>
	) 


	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper} >
					<Typography variant="h4" align="center">Checkout</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map(step=> (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
				</Paper>

			</main>
		</>

	)
}

export default Checkout;
