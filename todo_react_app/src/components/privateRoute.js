import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"
import store from "../store"

const PrivateRoute = ({ component: Component, auth }) => {
  const state = store.getState();
  console.log("in privte route ............ ", state)
  return (
   <Route
    render={props =>
      (state.auth.isAuthenticated === true) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />)
  }
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.isAuthenticated
})
export default connect(mapStateToProps)(PrivateRoute);
