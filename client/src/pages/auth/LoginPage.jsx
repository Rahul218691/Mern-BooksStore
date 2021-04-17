import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {Loading,Alert,GoogleBtn} from '../../components';
import {useSelector,useDispatch} from 'react-redux';
import {login} from '../../actions/authActions';
import {USER_AUTH_RESET} from '../../constants/authConstants';

const LoginPage = ({location,history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')   

    const dispatch = useDispatch();

    const {loading, error, userInfo} = useSelector((state) => state.userLogin)
    
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email,password))
    }
  
    if(error){
            setTimeout(()=>dispatch({
                type:USER_AUTH_RESET
            }),2000);	
    }

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            history.push('/admin/dashboard')
        }else if(userInfo && !userInfo.isAdmin){
            history.push('/dashboard')
        }
    },[history,userInfo])

    return (
        <div className="loginpage">
            <div className="container mt-2">
                <h3 className="text-center">Login</h3>
                <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {error && <Alert type="danger">{error}</Alert>}
                            {loading && <Loading />}
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" placeholder="abc@gmail.com"
                                className="form-control"
                                value={email}
						        onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="*****"
                                className="form-control"
                                value={password}
						        onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="loginpage__text mb-2" style={{
                                display:'flex',
                                justifyContent:'space-between',
                                alignItems:'center'
                            }}>
                                <Link to='/register'>
                                    New User?Click here
                                </Link>
                                <Link to='/forgotpassword'>
                                    forgotpassword?
                                </Link>
                            </div>
                            <div>
                                <button className="btn btn-dark btn-block">Login</button>
                                <GoogleBtn text="oogle Login"/>
                            </div>
                        </form>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
