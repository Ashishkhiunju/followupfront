import { useState } from "react";
import "./Header.scss";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";

export const Header = (props) => {
  const navigate = useNavigate();
  const [showCluser, setShowCluser] = useState(true);
  const [showClnoti, setShowClnoti] = useState(true);
  const logoutSubmit = (e)=>{
    // e.preventDefault()
    axios.post('/api/logout').then(({data})=>{


        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        localStorage.removeItem('role');
        // navigate('/')
        window.location.href = "/";

      })

  }
  return (
    <>
      <div className="cl-header">
        <div className="row align-items-center">
          <div className="col-6 col-lg-8">
            <div className="cl-flex">
              <div
                className={`hamburger ${props.showSidebar ? "" : "show"}`}
                onClick={props.sideBarToggle}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* <div className="cl-search">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Search.."
                    />
                    <i className="fa fa-search icon"></i>
                  </div>
                </form>
              </div> */}
            </div>
          </div>
          <div className="col-6 col-lg-4">
            <div className="cl-flex justify-content-end">
              <div
                className={`cl-dropdown cl-noti ${showClnoti ? "toggle" : ""}`}
                onClick={() => {
                  setShowClnoti(!showClnoti);
                }}
              >
                <i className="fa fa-bell-o icon"></i>
                <span class="noti-count">0</span>
                <div className="dropdown-menu cl-dropdown-menu noti-list">
                  <div className="cl-header">
                    <h6 className="title">Notification</h6>
                    <badge className="cl-badge ">6 New</badge>
                  </div>
                  <div className="notification-list">
                    <ul>
                      <li>
                        <div className="avatar">
                          <img src="Images/testo.jpg" />
                        </div>
                        <div className="list-content">
                          <strong>
                            Congratulation chandani ! <span>Winner</span>
                          </strong>
                          <small>Won the monthly best seller badge</small>
                        </div>
                      </li>
                      <li>
                        <div className="avatar">
                          <img src="Images/testo.jpg" />
                        </div>
                        <div className="list-content">
                          <strong>
                            New Message <span>recieved</span>
                          </strong>
                          <small>you have 10 unread message</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={`cl-dropdown cl-user  ${showCluser ? "toggle" : ""}`}
                onClick={() => {
                  setShowCluser(!showCluser);
                }}
              >
                <div className="user-info">
                  <img src={window.baseurl+'/storage/'+localStorage.getItem('auth_image')} alt={localStorage.getItem('auth_name')} />
                  <div className="user-name">
                    <h6 className="title">{localStorage.getItem('auth_name')}</h6>
                    <small>{localStorage.getItem('role') === '1' ? 'Admin':"Staff"}</small>
                  </div>
                </div>
                <ul className="dropdown-menu user-dropdown-menu  cl-dropdown-menu">
                  <li className="user-detail">
                    <img src={window.baseurl+'/storage/'+localStorage.getItem('auth_image')} alt={localStorage.getItem('auth_name')} />
                    <p>
                    {localStorage.getItem('auth_name')}
                      <small>Member since Nov. 2012</small>
                    </p>
                    <button onClick={logoutSubmit} className="btn-small">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
