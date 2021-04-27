import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Home,Login,Register,Dashboard,AdminDashboard,BlogDetail,Author,BookDetails,Category
,CreateBlog,AddAuthor,AddCarousal,Genere,AddBooks} from './pages';
import {Nav,PdfViewer} from './components';
import PrivateRoute from './privateroutes/PrivateRoute';
import AdminRoute from './privateroutes/AdminPrivate';

const App = () =>{
  return (
    <BrowserRouter>
    <Nav />
      <Switch>
          <Route component={Home} path='/' exact/>
          <Route component={Login} path='/login' exact/>
          <Route component={Register} path='/register' exact/>
          <PrivateRoute component={Dashboard} path='/dashboard' exact/>
          <AdminRoute component={AdminDashboard} path='/admin/dashboard' exact/>
          <Route component={BlogDetail} path='/blog/details/:slug' exact/>
          <Route component={Author} path='/author/:authorname' exact/>
          <Route component={BookDetails} path='/book/details/:bookslug' exact/>
          <Route component={Category} path='/book/:category' exact/>
          <AdminRoute component={CreateBlog} path='/admin/createblog' exact/>
          <AdminRoute component={AddAuthor} path='/admin/addauthor' exact/>
          <AdminRoute component={AddCarousal} path='/admin/carousal' exact/>
          <AdminRoute component={Genere} path='/admin/genere' exact/>
          <AdminRoute component={AddBooks} path='/admin/addbook' exact/>
          <Route component={PdfViewer} path='/file/view' exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
