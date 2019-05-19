import React, {Component} from 'react';
import PropTypes from "prop-types"


class AddToDo extends Component{

	state = {
		title:" "
	}

	onChange = (e) => this.setState({[e.target.name]:e.target.value});

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addToDo(this.state.title)
		this.setState({title : ' '})
	}

	render(){

		return (

			<form onSubmit={this.onSubmit} style={{ display:'flex' }}>
				<input type="text" name="title" placeholder="Add ToDo" style={{flex:'10',padding:'5px'}} value={this.state.title} onChange={this.onChange}/>
				<input type="submit" value="submit" className="btn" style={{flex:'1'}}/>
			</form>


		)
	}
}

AddToDo.propTypes = {
	addToDo : PropTypes.func.isRequired
}

export default AddToDo;