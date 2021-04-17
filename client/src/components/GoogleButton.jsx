import React from 'react'
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {googleAuth} from '../actions/authActions';

const GoogleButton = ({text}) => {

    const dispatch = useDispatch();

    const responseSuccess = (response) =>{
      if(response){
        dispatch(googleAuth(response.tokenId))
      }
        // console.log(response)
        // axios({
        //   method:'POST',
        //   url:'http://localhost:5000/api/auth/googleauth',
        //   data:{tokenId:response.tokenId}
        // })
        // .then(response=>{
        //   console.log(response)
        // }).catch(error=>{
        //   console.log(error)
        // })
    }

    const responseError = (response) =>{
        console.log(response)
    }

    return (
        <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        render={renderProps => (
            <button className="btn btn-primary btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="fab fa-google"></i> {text}</button>
          )}
        buttonText="Login"
        onSuccess={responseSuccess}
        onFailure={responseError}
        cookiePolicy={'single_host_origin'}
      />
    )
}

export default GoogleButton
