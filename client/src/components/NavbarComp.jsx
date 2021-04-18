import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import Logo from '../images/logo.svg'
import {logout} from '../actions/authActions';
import {useSelector,useDispatch} from 'react-redux';
import './styles/NavbarComp.css';

const NavbarComp = ({history}) => {

   const dispatch = useDispatch()

   const {userInfo} = useSelector(state => state.userLogin)

   const logoutHandler = () =>{
  	dispatch(logout())
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" 
    style={{
      position:'sticky',
      zIndex:'100',
      top:'0'
    }}>
      <Link className="navbar-brand" to="/">
        <img src={Logo} alt="" width="35px"/> <span className="navbar__logoname">Evo-Books</span>
      </Link>
      {
        history.location.pathname !== '/login' && history.location.pathname !== '/register' && (
          <form style={{marginLeft: '34%'}} className="navbar__form">
            <div className="input-group">
              <input type="text" className="form-control searchInp" placeholder="search book" />
              <div className="input-group-append">
                <span className="btn btn-primary" id="basic-addon2"><i className="fas fa-search"></i></span>
              </div>
            </div>
          </form>
          )
      }
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {
            userInfo ? (
             <>
              <li className="nav-item active" onClick={logoutHandler}>
                <Link className="nav-link" to="#">Logout</Link>
              </li>
             </>
            ): (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
               
              </>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(NavbarComp)
