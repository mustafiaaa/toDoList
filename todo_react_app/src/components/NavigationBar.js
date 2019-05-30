import React, { Component } from 'react'
import { Menu, Segment, Table, Button, Icon, Label, Input } from 'semantic-ui-react'
import axios from "axios"
import 'semantic-ui-css/semantic.min.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { connect } from "react-redux";
import {logoutUser} from '../actions/authActions';
// import Calendar from "react-input-calendar"
const appUrl = "http://localhost:3050/todo"

class NavigationBar extends Component {
  state = { 
            error: null,
            isLoaded: false,
            items: [],
            activeItem: 'home',
            tableBody: [],
            date: '',
            inputText: ''
           }

  insertTodo = () => {

      axios.post(`${appUrl}/insertTodo`, {title: this.state.inputText, lastDate: this.state.date})
                    .then(res => {
                      console.log(res)
                      if(res.data.success === true){
                        alert("Todo Inserted successfully !!!")
                        window.location.reload()
                      }
      })
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
  handleMarkAll = () => {
              axios.post(`${appUrl}/updateAllTodo`)
              .then(res => {
                console.log(res)
                if(res.data.success === true){
                  alert("All Todo Updated successfully !!!")
                  window.location.reload()
                }
              })
  }

  handleDateChange = (date) => {
      this.setState({date})
  }

  handleTextChange = (value) => {
    this.setState({inputText: value.target.value})
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

  diff_minutes(dt2, dt1) 
  {
    dt2 = new Date(dt2)
    dt1 = new Date(dt1)
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    diff /= 60;
    diff = Math.abs(Math.round(diff))
    if(diff > 24)
    {
        diff /= 24
        diff = Math.abs(Math.round(diff))
        diff += ' Days'
    }
    else{
        diff += " Hours"
    }  
    return (diff);

 }

 onLogoutClick = () => this.props.logoutUser();

  render() {
    const user =  this.props.auth;
    console.log('loggedIn User..........', user.name)
    const { activeItem } = this.state
    // console.log(this.state)
    let tableBody = []
    if(this.state.items.length > 0){
      let noOfElements = 0
      for(let data of this.state.items){
        noOfElements++
        tableBody.push(
          <Table.Row key={noOfElements}>
            <Table.Cell>{noOfElements}.</Table.Cell>
            <Table.Cell>{data.title}</Table.Cell>
            <Table.Cell>{data.createdDate}</Table.Cell>
            <Table.Cell>{this.diff_minutes(data.lastDate, data.createdDate)}</Table.Cell>
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
        <Segment raised key="todoInput">
        <Label as='a' color='blue' ribbon>
            ToDo List
        </Label>
        <Input className="inputSize" onChange={this.handleTextChange} placeholder='Insert new todo task...' />
        <DatePicker  className="dateInput
        " selected={this.state.date} onChange={this.handleDateChange} 
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
        />
              <Button.Group>
              <Button>Cancel</Button>
              <Button.Or />
              <Button positive onClick={this.insertTodo}>Save</Button>
              </Button.Group>
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
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.onLogoutClick}
            />
          </Menu.Menu>
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
                {tableBody}
              </Table.Body>
              <Table.Footer>

              </Table.Footer>
            </Table>  
            <Button className="checkAll" onClick={this.handleMarkAll} style={this.state.activeItem === 'Completed' ? {display: 'none', marginLeft : "10vw"} : {display: 'block'}}>
                  <Label as='a' color='teal' ribbon>
                  Mark All
                  </Label>
                  <Icon name='checkmark' />
            </Button>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavigationBar);
