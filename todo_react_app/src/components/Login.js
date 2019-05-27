import React from 'react';
import {Link} from 'react-router-dom';
import { Form, Label, Input, Button } from 'semantic-ui-react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/home"); // push user to home when they login
        }
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
    }

    render() {
        const {errors} = this.state;
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
    auth: state.auth,
    errors: state.errors
});
  
export default connect(mapStateToProps,{ loginUser })(Login);