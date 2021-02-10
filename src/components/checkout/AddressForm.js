import React,{useState, useEffect} from 'react'
import {Grid, InputLabel, Select, MenuItem, Typography, Button} from '@material-ui/core';
import { useForm, FormProvider } from "react-hook-form";
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';
import _ from 'lodash';
import {Link} from 'react-router-dom';

const AddressForm = ({ checkoutToken, next }) => {
	const methods = useForm();

	const [shippingCountries, setShippingCountries] = useState([])
	const [shippingCountry, setShippingCountry] = useState("")
	const [shippingProvinces, setShippingProvinces] = useState([])
	const [shippingProvince, setShippingProvince] = useState("")
	const [shippingOption, setShippingOption] = useState("UPS-(Free)")
	
	
	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListCountries(checkoutTokenId);
		setShippingCountries(countries);
	}

	const fetchProvinces = async (countryCode) => {
		const provinces = await commerce.services.localeListSubdivisions(countryCode);
		setShippingProvinces(provinces.subdivisions)
	}

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id)
	}, [checkoutToken.id] )
	
	useEffect(() => {
		if(shippingCountry) fetchProvinces(shippingCountry);
	},[shippingCountry])



	return (
		<>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}> 
				<form onSubmit={methods.handleSubmit((data) => next(data))}>
					<Grid container spacing={3} >
						<FormInput required name="firstName" label="First Name " />
						<FormInput required name="lastName" label="Last Name " />
						<FormInput required name="address" label="Address" />
						<FormInput required name="email" label="Email" />
						<FormInput  required name="city" label="City"/>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
							{
							_.entries(shippingCountries).map(country => 
								(<MenuItem key={country[0]} value={country[0]}>
									{country[1]}
								</MenuItem>)
							)}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Province</InputLabel>
							<Select value={shippingProvince} fullWidth onChange={(e) => setShippingProvince(e.target.value)}>
							{_.entries(shippingProvinces).map(city=> 
								(<MenuItem key={city[0]} value={city[0]}>
									{city[1]}
								</MenuItem>)
							)}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
								<MenuItem key={shippingOption} value={shippingOption}>
									{shippingOption}
								</MenuItem>
							</Select>
						
					</Grid>
					</Grid>
					<br />
						<div style={{display:'flex', justifyContent:"space-between"}}> 
							<Button component={Link} to="/cart" variant="outlined" >Back to Cart</Button>
							<Button type="submit"  color="primary">Pay</Button>
						</div>
				</form>
			</FormProvider>

		</>
	)
}

export default AddressForm
