import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddToDo from './components/AddToDo';
//import uuid from 'uuid';
import About from './components/pages/About'
import axios from 'axios';
import './App.css';

class App extends Component{

  state = {
    todos:[
  ]
}

componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({todos:res.data}))
}

  markCompleted = (id) => {
    this.setState({todos:this.state.todos.map(todo=>{
      if(todo.id===id){
        todo.completed=!todo.completed
      }
      return todo

    }) });
  }

  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
     this.setState({todos:[...this.state.todos.filter(todo=>todo.id!=id)]}))
  }

  addToDo = (title) =>{
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title:title,
      completed:false
    }).then(res => this.setState({todos:[...this.state.todos,res.data]}))
    
  }

  render(){

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddToDo addToDo={this.addToDo} />
                  <Todos todos={this.state.todos} markCompleted = {this.markCompleted} delTodo={this.delTodo}/>
                </React.Fragment>
              )}/>

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
      )
  }
}

export default App;
