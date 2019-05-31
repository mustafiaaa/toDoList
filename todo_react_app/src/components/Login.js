import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Label, Input, Button } from 'semantic-ui-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends React.Component{
    
    state = {
        email: '',
        password: '',
        errors: {}
    };

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(userData)
    }

    render() {
        const {errors} = this.state; 
        console.log("In login render..........",this.props)
        if(this.props.isAuthenticated === true)
            this.props.history.push("/navigation")
        return(
            <div>
                <h4>Login Below</h4>
                <p>Don/'t Have An Account? <Link to='/'>Register</Link></p>
                <Form onSubmit={this.onSubmit}>
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
                    <Button type='submit'>Login</Button>
                </Form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
};
  
const mapStateToProps = state => ({
    errors: state.errorReducers.errors,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    serverResponse: state.auth.serverResponse
});

const mapDispatchToProps = (dispatch) => ({
    login: (userData) => dispatch(loginUser(userData, dispatch)),
});
  
export default connect(mapStateToProps,mapDispatchToProps)(Login);