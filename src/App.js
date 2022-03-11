import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, BrowserRouter as Router, useLocation, useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from './logo.svg';
import authService from './services/auth.service';
import { Modal } from 'antd';
import Login from './components/login/login';
import ShipperPage from './components/shipper/shipper-page';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const history = useHistory();

  const logOut = () => {
    authService.logout();
  }

  return (
    <div className="App">

      <Router>
        {/* <Modal title="Basic Modal" visible={validateModal} onOk={handleOkValidateModal} onCancel={handleCancelValidateModal}>
        <p>Vui lòng đăng nhập để mở trang này !</p>
      </Modal> */}

        <nav className="navbar navbar-expand navbar-light" style={{ backgroundColor: "#87e8de" }}>
          <Link to={"/"} className="navbar-brand">
            SangShipper
          </Link>
          {
            currentUser != null && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/shipper"} className="nav-link">
                    Giao hàng
                  </Link>
                </li>
              </div>
            )
          }

          {currentUser != null ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Đăng xuất
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Đăng nhập
                </Link>
              </li>
            </div>
          )}
        </nav>

        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/shipper" component={ShipperPage} />
          {/* <Route path="/manage" component={AdminPage} />
          <Route path="/login" component={Login} />
          <Route path="/error-page" component={ErrorPage} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
