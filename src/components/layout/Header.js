import React from 'react';
import {Link} from 'react-router-dom'

function Header(){
	return(
		<header style={headerStyle}>

			<h1>Todo List</h1>
			<Link to="/">Home</Link> | <Link to="/About">About</Link>
		</header>

		)
}

const headerStyle = {
	backgroundColor:'grey',
	color:'white',
	textAlign:'center',
	padding:'10px'
}


export default Header