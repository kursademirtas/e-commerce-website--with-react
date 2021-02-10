import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core';

import useStyles from '../styles/cartItem';


const CartItem = ({ item, updateItem, removeItem }) => {
	const classes = useStyles();
	
	return (
		<Card>
			<CardMedia image={item.media.source} alt={item.name} className={classes.media} />
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h5">{item.line_total.formatted_with_symbol} </Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<div className={classes.buttons}>
					<Button type="button" size="small" onClick={() => updateItem(item.id, item.quantity-1)}>-</Button>
					<Typography >{item.quantity}</Typography>
					<Button type="button" size="small" onClick={() => updateItem(item.id, item.quantity+1)}>+</Button>
				</div>
				<Button variant="contained"color="secondary" type="button" onClick={() => removeItem(item.id)}>Remove</Button>
			</CardActions>

		</Card>
	)
}

export default CartItem
