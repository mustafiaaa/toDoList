import React, { Component } from 'react';
import {connect} from "react-redux"
import { Table, Button, Icon, Label } from 'semantic-ui-react'
import {getActiveTodo, updateTodo, deleteTodo, updateAllTodo} from "../../actions/serverActions"
import InputTodo from "./InputTodo"

class TodoList extends Component {
    componentDidMount(){
      this.props.dispatch(getActiveTodo())

    }

    // state = {
    //    audioUrl: ''
    // }

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

   handleMark = async (e, {todoid}) => {            
        await this.props.dispatch(updateTodo({todoid}))
        if(this.props.serverResponse === true){
            this.props.dispatch(getActiveTodo())
        }
    
    }
  
    handleDelete = async (e, {todoid}) => {
        await this.props.dispatch(deleteTodo({todoid}))
        if(this.props.serverResponse === true){
            this.props.dispatch(getActiveTodo())
        }
    }

    handleMarkAll = async (e) => {
        await this.props.dispatch(updateAllTodo())
        if(this.props.serverResponse === true){
            this.props.dispatch(getActiveTodo())
        }
        // this.setState({audioUrl: 'https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3'})
        // var audio = document.getElementById('audio');

        // var source = document.getElementById('audioSource');
        // source.src = this.state.audioUrl

        // audio.load(); //call this to just preload the audio without playing
        // audio.play(); //call this to play the song right away
    }

    render() { 
        const todoItems  = this.props.todoItems;
        let tableBody = [];
        if(todoItems.length > 0){
          let noOfElements = 0
          for(let data of this.props.todoItems){
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
                    <Button onClick={this.handleMark}  todoid={data._id}>
                      <Icon name='checkmark' />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            )
          }
        }

        return ( 
          <div>
            {/* <audio id="audio" controls="controls">
            <source id="audioSource" src={this.state.audioUrl}></source>
            Your browser does not support the audio element.
            </audio> */}
              <InputTodo />
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
            <Button className="checkAll" onClick={this.handleMarkAll} >
                  <Label color='teal' ribbon>
                  Mark All
                  </Label>
                  <Icon name='checkmark' />
            </Button>
            </div>
         )
    }
}
 
const mapStateToProps = (state, props) => {
    return {
      todoItems: state.addEditReducer.todoItems,
      error:  state.addEditReducer.error,
      selectedItem: state.addEditReducer.selectedItem,
      serverResponse: state.addEditReducer.serverResponse
    }
  }
  
export default connect(mapStateToProps)(TodoList)