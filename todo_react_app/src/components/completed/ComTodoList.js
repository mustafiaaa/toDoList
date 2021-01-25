import React, {Component} from "react"
import {getCompletedTodo, deleteTodo} from "../../actions/serverActions"
import { Table, Button, Icon } from 'semantic-ui-react'
import {connect} from "react-redux"

class ComTodoList extends Component {
    componentDidMount(){
      this.props.dispatch(getCompletedTodo())
    }

   handleDelete = async (e, {todoid}) => {
        await this.props.dispatch(deleteTodo({todoid}))
        if(this.props.serverResponse === true)
            this.props.dispatch(getCompletedTodo())
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
                <Table.Cell><span>Completed</span></Table.Cell>
                <Table.Cell>
                  <Button.Group icon>
                    <Button todoid={data._id} onClick={this.handleDelete}>
                      <Icon name='delete calendar' />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            )
          }
        }

        return ( 
          <div>
              <Table color="grey" key="grey">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>SL.No</Table.HeaderCell>
                  <Table.HeaderCell>ToDo Title</Table.HeaderCell>
                  <Table.HeaderCell>Created Date</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tableBody}
              </Table.Body>
            </Table>  
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
  
export default connect(mapStateToProps)(ComTodoList)