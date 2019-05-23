import React, { Component } from 'react'
import { Menu, Segment, Table, Button, Icon, Label, Input } from 'semantic-ui-react'
import axios from "axios"
import 'semantic-ui-css/semantic.min.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// import Calendar from "react-input-calendar"
const appUrl = "http://localhost:3050/todo"

export default class NavigationBar extends Component {
  state = { 
            error: null,
            isLoaded: false,
            items: [],
            activeItem: 'home',
            tableBody: []
           }
  

  handleItemClick = (e, { name }) => {
                      this.setState({ activeItem: name, tableBody: [], items: []})
                      if(name === 'Completed'){
                          axios.get(`${appUrl}/getDone`)
                          .then(res => {
                             this.setState({items: res.data.toDo})
                          }) 
                      }
                      else{
                        axios.get(`${appUrl}/getNotDone`)
                        .then(res => {
                           this.setState({items: res.data.toDo})
                        })
                      }
                    }
  
  handleMark = (e, {todoid}) => {
                    axios.post(`${appUrl}/updateTodo`, {todoid})
                    .then(res => {
                      console.log(res)
                      if(res.data.success === true){
                        alert("Todo Updated successfully")
                        window.location.reload()
                      }
                    })
                }

  handleDelete = (e, {todoid}) => {
                    axios.post(`${appUrl}/deleteTodo`, {todoid})
                    .then(res => {
                      console.log(res)
                      if(res.data.success === true){
                        alert("Todo Deleted successfully !!!")
                        window.location.reload()
                      }
                    })
                }
    
  // insertTodo = (e, {}) 
  componentDidMount(){
    console.log("inside component did mount")
    if(this.state.activeItem === 'home'){
      axios.get(`${appUrl}/getNotDone`)
        .then(res => {
           this.setState({items: res.data.toDo})
        })
    }
  }

  render() {
    const { activeItem } = this.state
    
    // console.log(this.state)
    if(this.state.items.length > 0){
      let noOfElements = 0
      for(let data of this.state.items){
        noOfElements++
        this.state.tableBody.push(
          <Table.Row key={noOfElements}>
            <Table.Cell>{noOfElements}.</Table.Cell>
            <Table.Cell>{data.title}</Table.Cell>
            <Table.Cell>{data.createdDate}</Table.Cell>
            <Table.Cell>{data.lastDate}</Table.Cell>
            <Table.Cell>
              <Button.Group icon>
                <Button todoid={data._id} onClick={this.handleDelete}>
                  <Icon name='delete calendar' />
                </Button>
                <Button onClick={this.handleMark} style={this.state.activeItem === 'Completed' ? {display: 'none'} : {display: 'block'}} todoid={data._id}>
                  <Icon name='checkmark' />
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      }
    }
    let inputElement = []
    if(this.state.activeItem === 'home'){
      inputElement.push(
        <Segment raised>
        <Label as='a' color='blue' ribbon>
            ToDo List
        </Label>
        <Input className="inputSize" placeholder='Insert new todo task...' />
              <Button.Group>
              <Button>Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.insertTodo}>Save</Button>
              </Button.Group>
              <DatePicker selected={this.state.date} onChange={this.handleChange} />
        
        </Segment>
      )
    }
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
              {inputElement}
              <Table color="grey" key="grey">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>SL.No</Table.HeaderCell>
                  <Table.HeaderCell>ToDo Title</Table.HeaderCell>
                  <Table.HeaderCell>Created Date</Table.HeaderCell>
                  <Table.HeaderCell>Time Remaining</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.tableBody}
              </Table.Body>
            </Table>  
        </Segment>
      </div>
    )
  }
}