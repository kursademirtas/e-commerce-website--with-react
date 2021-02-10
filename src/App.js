import React, {useState,useEffect} from 'react';
import NavBar from './components/NavBar';
import Products from './components/Products';
import Checkout from './components/checkout/Checkout'
import { commerce } from './lib/commerce';
import Cart from './components/Cart'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({})

	const fetchProducts = async () => {
		const { data }= await commerce.products.list();
		setProducts(data);
	}

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve())
	}

	const handleAddtoCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);
		setCart(item.cart);
	}

	const handleUpdateCartQty = async (productId, quantity) => {
		const { cart } = await commerce.cart.update(productId, { quantity });
		setCart( cart )

	}
	const handleRemoveFromCart = async (productId) => {
		const { cart } = await commerce.cart.remove(productId);
		setCart( cart )

	}
	const handleEmptyCart = async () => {
		const { cart } = await commerce.cart.empty();
		setCart( cart )

	}


	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, [])


	return (
		<Router>
	<div>
		<NavBar totalItems= {cart.total_items}  />
		<Switch>
			<Route exact path="/">
				<Products products = {products} onAddtoCart= {handleAddtoCart}/>
			</Route>
			<Route exact path="/cart">
				<Cart 
					 cart={ cart } 
					 updateItem = {handleUpdateCartQty}
					 removeItem = {handleRemoveFromCart}
					 emptyCart= {handleEmptyCart}
				/>
			</Route>
			<Route exact path="/checkout">
				<Checkout cart={cart} emptyCart= {handleEmptyCart}/>
			</Route>
		
		</Switch>
	
	</div>
		</Router>

		
	);
}

export default App;
