import React, { Component } from 'react'
import { Menu, Segment} from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import TodoList from "./home/TodoList"
import ComTodoList from "./completed/ComTodoList"

class TodoApp extends Component {
  state = {
      activePage: "Home"
  }

  handleItemClick = (e, {name}) => {
      this.setState({activePage: name})
  }

  render() {
    // console.log(this.state)
    return (
      <Router>
      <div>
        <Menu pointing secondary>
        <Link to={'/'}><Menu.Item name='Home' active={this.state.activePage === 'Home'}  onClick={this.handleItemClick} /></Link>
          <Link to={'/completed'}><Menu.Item 
            name='Completed'
            active={this.state.activePage === 'Completed'}
            onClick={this.handleItemClick}
          /></Link>
        </Menu>
        <Segment>
           <Switch>
           <Route exact path='/' component={TodoList} />  
              <Route path="/completed"
              component={ComTodoList} />
            </Switch>
        </Segment>
        </div>
      </Router>
    )
  }
}

export default TodoApp
