import React from 'react'
import { AppBar, Toolbar, IconButton, Badge,  Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from '../styles/navbar';

import { Link, useLocation } from 'react-router-dom';



const NavBar = ({totalItems}) => {

	const classes = useStyles();
	const { pathname } =useLocation();

	return (
		<>
			<AppBar  position="fixed" className={classes.AppBar} color="inherit">
				<Toolbar>
					<Typography component={Link} to="/" variant="h6" className={classes.appBar} color="inherit">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAC7CAMAAACjH4DlAAAAdVBMVEUAAAD///8EBARtbW319fU/Pz8eHh4kJCS7u7tYWFj8/Pzx8fEHBwf4+PhGRkbX19fOzs58fHyGhoa8vLyUlJTo6OisrKxPT09hYWE1NTWioqLCwsKcnJzp6emysrIvLy+MjIwXFxfc3Nx0dHRBQUFWVlY4ODitCgDhAAAC5ElEQVR4nO3bC0/bMBSGYR83tOCkTSi9Qy90rP//J87HaQBpoWmnbUH2+yBBUFrJ+bCdk9oYAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCbs3034NuwTRREYkIak8VuNzWm6Lsp38NUVEkawZu48PX0adwk7N5HEfLYm4I4zFzjULMwmd6WSHz5lXUYTo63j5YIR9dBGkv/x14PbrCMsXvMmzgW/uKWcoPnvpv+91kzrPyV5YNKMu385Q1x3Pfd+H/A1xuTwerVPIqsfDiH7hTijqMZ/s53fn8szuXZFXIXZxw+A6uhPEn26n+rJL/ujVmUcdRsYVYij/5oIDK46i0xx6HDZCuV9pNcquVDt0nUcfjRshAZ+jx2SU+lH9Z1of5AHMr6gmyupUdOHMFMZOJT2Ygbd2fh4rzRfrJ3oVA/6aDplkceh1bocz041j86RH1nCU/rH4X64HTXYR95HPr0ovOB1UFzhejnDmOeRbSXVNIdSPxTqa0L9cL88BfrOhKJPw6jtwst1I27pnskEMdC3D4U6lnnukvsU6laihzqQTPtemkCcWihftSDuZTF8KIU4ii0UD+FQp25Q+MYimx8HG/caI2pP0rPddAcpeNWm0IcRgv1sR7MrrjVxh+HN7jT7yMnu2J0QQpTaS0sNVSyvfyqcRpx2Hohun66/VIycTTGl9ZgfR5JxaHLUHLhrE1n7qgt62Wo39jzLoak4nisSpHStOzgsIUZbcrjJp04rH4OpKXWunWDz1uWSJHeeDkXWrPW7XPb89mn/9+wfmTnCy7bTq6SqkpVc8F50bL766Wp35PpHU0c27bNcNPm7KKHlvWien9mbZlK1+GU7yE/e2hZD6yZuPB8n+1bt0puJJxNZeooCvOg2yuPp7Y0bFjbTmiohP/lKEbmi3/q0ISGQxPjHtsvNDNG6wWfH3kj3IH958gCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAePcLDDgaoq0gP8oAAAAASUVORK5CYII=" alt="Diesel" height="25px" className={classes.image} />
						Shop
					</Typography>
					<div className={classes.grow}/>
					
					{pathname!== "/cart"&&(
						<div className={classes.button}>
							<IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit" >
								<Badge badgeContent={totalItems} color="secondary">
									<ShoppingCart/>
								</Badge>
							</IconButton>
						</div>
					)
					}

				</Toolbar>

			</AppBar>
		</>
	)
}

export default NavBar
