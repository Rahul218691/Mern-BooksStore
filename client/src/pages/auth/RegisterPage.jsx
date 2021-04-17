import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import Noty from 'noty';
import '../../../node_modules/noty/lib/noty.css';
import '../../../node_modules/noty/lib/themes/mint.css';
import {Loading,Alert,GoogleBtn} from "../../components";
import {register} from '../../actions/authActions';
import {USER_AUTH_RESET} from '../../constants/authConstants';
import {useDispatch,useSelector} from 'react-redux';

const RegisterPage = ({location,history}) => {

    const dispatch = useDispatch();	

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const {loading, error, userInfo } = useSelector((state) => state.userLogin)

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
          return new Noty({
              type:'error',
              text:'Password does not match',
              timeout:2000,
              progressBar:false
          }).show(); 		
        }else{
            dispatch(register(name,email,password))
        }
    }
  
    if(error){
            setTimeout(()=>dispatch({
                type:USER_AUTH_RESET
            }),2000);
    } 

    useEffect(()=>{
        if(userInfo){
            history.push('/')
        }
    },[history,userInfo])    

    return (
        <div className="loginpage">
            <div className="container mt-2">
                <h3 className="text-center">Create new Account</h3>
                <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {loading && <Loading />}
                            {error && <Alert type="danger">{error}</Alert>}
                        <form onSubmit={submitHandler}>
                        <div className="form-group">
                                <label htmlFor="name">Username</label>
                                <input type="text" id="name" placeholder="username"
                                className="form-control"
                                value={name}
            			        onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" placeholder="abc@gmail.com"
                                className="form-control"
                                value={email}
            			        onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="*****"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confpassword">ConfirmPassword</label>
                                <input type="password" id="confpassword" placeholder="*****"
                                className="form-control"
                                value={confirmPassword}
            			        onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className="loginpage__text mb-2 text-right">
                                <Link to='/login'>
                                   Already have an account?
                                </Link>
                            </div>
                            <div>
                                <button className="btn btn-dark btn-block">Register</button>
                                <GoogleBtn text="Signup with Google"/>
                            </div>
                        </form>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
