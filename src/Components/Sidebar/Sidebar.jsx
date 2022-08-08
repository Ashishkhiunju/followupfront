import "./Sidebar.scss";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import $ from 'jquery';

export const Sidebar = (props) => {
    $(document).ready(function(){
        $('.accordion-body .item').click(function(){
            // $('.item').removeClass('active');
            $('.item').not(this).removeClass('active');
            $(this).addClass('active');
        })
    })


  return (
    <>
      <div className="cl-sidebar">
        <Accordion className="cl-sidemenu">
          <Link className="menu-item home" to="/">
            <i className="fa fa-home icon"></i>
            <span>Dashboard</span>
          </Link>

          <Accordion.Item eventKey="0">
            <Accordion.Header className="menu-item">
              <i className="fa fa-money icon"></i>
              <span>Load Details</span>
            </Accordion.Header>
            <Accordion.Body>
              <Link className="item" to="/add-loan">
                Loan
              </Link>
              {/* <Link className="item" to="/loan-list">
                 List
              </Link> */}
              <Link className="item" to="/loan-type-create">
                 Loan Type
              </Link>
              { localStorage.getItem('role') == 1 &&
                 <>
                <Link className="item" to="/loan-transfer">
                Loan Transfer
                 </Link>
                 <Link className="item" to="/users-loan">
                 Loan By User
                  </Link>
                  </>
              }
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="menu-item">
              <i className="fa fa-clock-o icon"></i>
              <span>Reminder</span>
            </Accordion.Header>
            <Accordion.Body>
              <Link className="item" to="/sent-reminders">
                Sent Reminders
              </Link>

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="menu-item">
              <i className="fa fa-user-o icon"></i>
              <span>Customer</span>
            </Accordion.Header>
            <Accordion.Body>
              <Link className="item" to="/add-customer">
                Add
              </Link>
              <Link className="item" to="/list-customer">
                List
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          { localStorage.getItem('role') == 1 &&

            <Accordion.Item eventKey="3">
            <Accordion.Header className="menu-item">
              <i className="fa fa-user-o icon"></i>
              <span>User Management</span>
            </Accordion.Header>
            <Accordion.Body>
              <Link className="item" to="/add-user">
                Add
              </Link>
              <Link className="item" to="/user-list">
                list
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          }
          <Accordion.Item eventKey="4">
            <Accordion.Header className="menu-item">
              <i className="fa fa-floppy-o icon"></i>
              <span>Savings</span>
            </Accordion.Header>
            <Accordion.Body>
              <Link className="item" to="/saving/create">
                Saving
              </Link>

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header className="menu-item">
              <i className="fa fa-list icon"></i>
              <span>Recommenders</span>
            </Accordion.Header>
            <Accordion.Body>
              <Link className="item" to="/recommender/create">
                Recommenders
              </Link>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};
