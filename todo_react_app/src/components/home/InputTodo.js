import React, {Component} from "react"
import { Label, Input, Segment, Button} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { connect } from 'react-redux'
import {addTodo, getActiveTodo} from "../../actions/serverActions"
class InputTodo extends Component{
    state = {
        date: '',
        inputText: '',
    }
    
    handleDateChange = (date) => {
        this.setState({date})
    }
  
    handleTextChange = (value) => {
      this.setState({inputText: value.target.value})
    }

    handleCancel = () => {
        this.setState({inputText: "", date: ""})
    }
     inserTodo = async () =>{
        const title = this.state.inputText
        const date = this.state.date
        if(title !== '' || date !== '')
        {    
            await this.props.dispatch(addTodo(title, date))
            if(this.props.serverResponse === true)
            {
                this.props.dispatch(getActiveTodo())
                this.setState({inputText: '', date: ''})
            }
        }
        else{
            alert("Please fill the from Properly !!! ")
        }

    }
    render(){
        return(
            <Segment raised>
            <Label color='blue' ribbon style={{marignRight: "0px !important"}}>
                Add Todo
            </Label>
            <Input className="inputSize" onChange={this.handleTextChange} value={this.state.inputText}  placeholder='Insert new todo task Component...' />
            <Label color="blue" ribbon>Date</Label>
            <DatePicker  selected={this.state.date} className="dateInput
            "  
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
                  onChange={this.handleDateChange}
            />
                  <Button.Group>
                  <Button onClick={this.handleCancel}>Cancel</Button>
                  <Button.Or />
                  <Button positive onClick={this.inserTodo} >Save</Button>
                  </Button.Group>
            </Segment>
        )
    }
} 

const mapStateToProps = (state, props) => {
    return {
      todoList: state.addEditReducer.todoItems,
      error:  state.addEditReducer.error,
      selectedItem: state.addEditReducer.selectedItem,
      serverResponse: state.addEditReducer.serverResponse
    }
  }
  
  export default connect(mapStateToProps)(InputTodo)