import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
 
const  PrivateRoute = ({ component:Component, ...rest }) =>{

    const {userInfo} = useSelector(state=>state.userLogin);

  return (
    <Route
      {...rest}
      render={ props =>
        userInfo ? (
         <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;