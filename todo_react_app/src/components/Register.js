import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Form, Input, Label, Button } from 'semantic-ui-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = e => {
        if(this.state.password === this.state.confirmPassword){
            console.log('in if')
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            };
            this.props.registerUser(newUser, this.props.history);
        }
        else{
            console.log('in else')
            alert('Passwords must be same');
        }
    }

    render() {
        
        const {errors} = this.state;
        return(
            <div>
                <h4>Register Below</h4>
                <p>Already Have An Account? <Link to='/Login'>Login</Link></p>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <Label>User Name</Label>
                        <Input 
                            placeholder = 'Enter UserName'
                            onChange = {this.onChange}
                            value = {this.state.name}
                            error = {errors.name}
                            id = 'name'
                            type = 'text'
                            required/>
                    </Form.Field>
                    <Form.Field>
                        <Label>Email</Label>
                        <Input 
                            placeholder='Enter Your Email'
                            onChange = {this.onChange}
                            value = {this.state.email}
                            errors = {errors.email}
                            id = 'email'
                            type = 'email'
                            required />
                    </Form.Field>
                    <Form.Field>
                        <Label>Password</Label>
                        <Input
                            placeholder='Enter Password'
                            onChange = {this.onChange}
                            value = {this.state.password}
                            errors = {errors.password}
                            id = 'password'
                            type = 'password'
                            required/>
                    </Form.Field>
                    <Form.Field>
                        <Label>Confirm Password</Label>
                        <Input
                            placeholder='Confirm Password'
                            onChange = {this.onChange}
                            value = {this.state.confirmPassword}
                            errors = {errors.confirmPassword}
                            id = 'confirmPassword'
                            type = 'password'
                            required/>
                    </Form.Field>
                    <Button type = 'submit'>Sign Up</Button>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
  };
  
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps,{ registerUser })(withRouter(Register));