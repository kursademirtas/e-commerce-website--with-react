import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import  { AddShoppingCart } from "@material-ui/icons"

import useStyles from '../styles/product';

const Product = ({ product, onAddtoCart }) => {

	const classes = useStyles();
	
	return (
		
		<Card className={classes.root}>
			
			<CardMedia className={classes.media} image={product.media.source} title={product.name}/>
			<CardContent>
				<div className={classes.content}>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5">
						{product.price.formatted_with_symbol}
					</Typography>
				</div>
				<Typography variant="h2" color="textSecondary" >
					
				
				</Typography>
			</CardContent>
			<CardActions disableSpacing className={classes.CardActions}>
				<IconButton aria-label="Add to Cart" onClick={() => onAddtoCart(product.id, 1)} >
					<AddShoppingCart />
				</IconButton>

			</CardActions>
		</Card>

	)
}

export default Product
