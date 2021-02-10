import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';
import useStyles from '../styles/cart';
import CartItem from './CartItem';
import {Link} from 'react-router-dom';

const Cart = ({ cart, updateItem, removeItem, emptyCart }) => {
	const classes = useStyles();
	
	const EmptyCart = () => (
		<Typography variant="subtitle1">Your bag is empty!<Link to="/"> Go Shopping</Link></Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container-spacing={3} >
				{cart.line_items.map((item) =>(
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem 
							item={item}
							updateItem={updateItem}
							removeItem={removeItem}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails} >
				<Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_sembol}</Typography>
				<div>
					<Button className={classes.emptyButton} onClick={emptyCart} size="larger" type="button" variant="contained">Empty Bag</Button>
					<Button className={classes.checkoutButton} component={Link} to="/checkout" size="larger" type="button" variant="contained">Checkout</Button>
				</div> 
				
			</div>
		</>
	)

	if(!cart.line_items) return "loading..."
	return (
		<Container>
			<div className={classes.toolbar}/>
			<Typography className={classes.title } variant="h3">Your Shopping Cart</Typography>
			{!cart.line_items.length?<EmptyCart />: <FilledCart />}
		</Container>
	)
}

export default Cart
