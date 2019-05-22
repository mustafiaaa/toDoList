import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import axios from "axios"
import 'semantic-ui-css/semantic.min.css'

const appUrl = "localhost:3050/todo"

export default class NavigationBar extends Component {
  state = { 
            error: null,
            isLoaded: false,
            items: [],
            activeItem: 'home',
           }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount(){
      axios.get(`${appUrl}/getNotDone`)
        .then(res => {
           const items = res.toDo
           this.setState({items})
        })

  }

  render() {
    const { activeItem } = this.state
    console.log(this.state)
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item
            name='Completed'
            active={activeItem === 'Completed'}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment>
          <img alt="no_image" src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Segment>
      </div>
    )
  }
}