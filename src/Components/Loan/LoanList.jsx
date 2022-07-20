import Dropdown from "react-bootstrap/Dropdown";
import { Btn } from "../Button/Btn";
import "../Maincard/Table/Table.scss";
// import { Link } from "react-router-dom";
import { useEffect, State, useState} from "react";
import { Popup } from "../Popup/Popup";
import { ReminderForm } from "../Form/ReminderForm";
import { ViewForm } from "../Form/ViewForm";
import { LoanFollowForm } from "../Form/LoanFollowForm";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from 'axios';
import Swal from 'sweetalert2'
import {  BrowserRouter, Routes, Route, Link  } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Moment from 'moment';
import { last } from "lodash";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import Form from 'react-bootstrap/Form';

export const LoanList = (props) => {
  const [loans,setLoans] = useState([]);
  const [todayfollowup,setTodayFollowUp] = useState([]);
  const [notcontactedtoday,setNotContactedToday] = useState([]);
  const [remindertoday,setReminderToday] = useState([]);
  const [makeContacted,setMakeContacted] = useState(false);
  const [reminderLoanId,setReminderLoanId] = useState(false);
  const [reminderInstallationDate,setReminderInstallationDate] = useState(false);
  const [activeTab,setActiveTab] = useState('/api/loan');
  const [filters,setFilter] = useState("ASC");
  const [searchKey,setSearchKey] = useState("");

  const handelChangeContact = async(e)=>{
    // console.log(e.target.attributes.loan_id.value);
    if(e.target.checked === true){
        const isConfirm = await Swal.fire({
            title: 'Are you sure you had contacted?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No Sorry',
            confirmButtonText: 'Yes, I had contacted'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            e.target.checked = false;
            return;
          }
          e.target.checked = true;

        var loan_id = e.target.attributes.loan_id.value;
        var installation_date = e.target.attributes.installation_date.value;
        const formdata = new FormData();
        formdata.append('loan_id',loan_id);
        formdata.append('installation_date',installation_date);
        axios.post(`/api/loan/makeconnected`,formdata).then(({data})=>{

            if(data.status === '200'){
                Swal.fire({
                    icon:"success",
                    text:data.message
                })
            }
            fetchNotContactToday()
        })

    }else{

    }
    // setMakeContacted(e.target.checked)

  }
//   alert(makeContacted)

 useEffect(()=>{
    document.title = 'Loan List'
  fetchLoans()
  fetchLoansTodayFollowUp()
  fetchNotContactToday()
  fetchReminderToday()
 },[])

 const fetchReminderToday = async(pageNumber = 1)=>{
    await axios.get(`/api/loans/reminder?page=${pageNumber}`,{params:{search:searchKey,filter:filters}}).then(({data})=>{

        setReminderToday(data)
    })
   }
// console.log(remindertoday)
 const fetchLoans = (pageNumber = 1)=>{


   axios.get(`/api/loan?page=${pageNumber}`,{params:{search:searchKey,filter:filters}}).then(({data})=>{

    setLoans(data)
  })
 }
 const fetchLoansTodayFollowUp = (pageNumber = 1)=>{
   axios.get(`/api/loans/todayfollowup?page=${pageNumber}`,{params:{search:searchKey,filter:filters}}).then(({data})=>{

    setTodayFollowUp(data)
  })
 }

// console.log(todayfollowup);
 const fetchNotContactToday = (pageNumber = 1)=>{
     axios.get(`/api/loans/notContacted?page=${pageNumber}`,{params:{search:searchKey,filter:filters}}).then(({data})=>{

      setNotContactedToday(data)
    })
   }


  const [visible, setVisible] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);

  const openModal = (loanid,installationDate) => {
    setReminderLoanId(loanid);
    setReminderInstallationDate(installationDate);
    setShowViewForm(false);
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  const openViewModal = () => {
    setVisible(false);
    setShowViewForm(true);
  };
  const closeViewModal = () => {
    setShowViewForm(false);
  };

  const deleteLoan = async (id) => {
    const isConfirm = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        return result.isConfirmed
      });

      if(!isConfirm){
        return;
      }

      await axios.delete(`/api/loan/${id}`).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
        fetchLoans()
      }).catch(({response:{data}})=>{
        Swal.fire({
            text:data.message,
            icon:"error"
        })
      })
}

const handleSearch = (e,pageNumber = 1)=>{
    setSearchKey(e.target.value);
     axios.get(activeTab+`?page=${pageNumber}`,{params:{search:searchKey,filter:filters}}).then(({data})=>{

        if(activeTab === '/api/loan' ){
            setLoans(data)
        }else if(activeTab === "/api/loans/todayfollowup"){
            setTodayFollowUp(data)
        }else if(activeTab === "/api/loans/notContacted"){
            setNotContactedToday(data)
        }else{
            setReminderToday(data)
        }


      })


}

const handleFilter = (e,pageNumber = 1)=>{
   axios.get(activeTab+`?page=${pageNumber}`,{params:{filter:e}}).then(({data})=>{

      if(activeTab === '/api/loan' ){
          setLoans(data)
      }else if(activeTab === "/api/loans/todayfollowup"){
          setTodayFollowUp(data)
      }else if(activeTab === "/api/loans/notContacted"){
          setNotContactedToday(data)
      }else{
          setReminderToday(data)
      }


    })


}


if(localStorage.getItem('auth_token')){
  return (
    <>
      <div className="same-gap cl-table">
        <h4 className="title">Follow up Details</h4>
        <Tabs className="cl-tabs">
          <div className="data-filter">
            <TabList>
              <Tab onClick={(e)=>{
                setActiveTab('/api/loan')
              }}>All</Tab>
              <Tab onClick={(e)=>{
                setActiveTab('/api/loans/todayfollowup')
              }}>Today</Tab>
              <Tab onClick={(e)=>{
                setActiveTab('/api/loans/notContacted')
              }}>Not Contact</Tab>
              <Tab onClick={(e)=>{
                setActiveTab('/api/loans/reminder')
              }}>Reminder</Tab>
            </TabList>
            <div className="right-content">
              <div className="cl-search">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                     onChange={handleSearch}
                      className="form-control"
                      placeholder="Search.."
                    />
                    <i className="fa fa-search icon"></i>
                  </div>
                </form>
              </div>
              <Dropdown className="filter-dropdown">
                <Dropdown.Toggle className="cl-btn">
                  <span>Filter</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >
                    <span  onClick={(e)=>{handleFilter("ASC")}}>Asending</span>
                  </Dropdown.Item>
                  <Dropdown.Item >
                    <span onClick={(e)=>{handleFilter("DESC")}}>Desending</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <TabPanel className="all tabdetail" id="taball">
            <table className="table">
              <thead>
                <tr>
                  <th>S.N </th>
                  <th>Name</th>
                  <th>Expire Time</th>
                  <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Loan Amount</th>
                  <th>Phone</th>

                  {/* <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Not Paid Date</th>
                  <th>Previous Information</th> */}
                  <th>Image</th>
                  {!props.hideUpdate && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {loans?.data?.map((item, index) => {
                    Moment.locale('en');
                    var dt = Date.parse(item.due_date_eng);

                    var total_paid = 0;

                    var lastitem =  item.loan_details[item.loan_details.length-1]
                    var pay_date = lastitem?lastitem.created_at:"";
                //    console.log(pay_date)
                    {item.loan_details?.map((ldetail)=>{
                      total_paid += ldetail.paid_amount;

                    })}

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.customer.name}</td>
                      <td>{Moment(dt).format('D MMM Y')}</td>
                      <td>{pay_date?Moment(pay_date).format('D MMM Y'):"Not Paid yet"}</td>
                      <td>{item.loan_amount - total_paid}</td>
                      <td>{item.loan_amount}</td>
                      <td>{item.customer.phone}</td>
                      <td>
                        <Zoom>
                        <img width="50px" src={window.baseurl+`/storage/${item.customer.image}`} />
                      </Zoom>
                      </td>
                      {/* <td>{item.totalDue}</td>
                      <td>{item.noPaidDate}</td>
                      <td>{item.previousInfo}</td>
                      <td>{item.contactno}</td> */}
                      {!props.hideUpdate && (
                        <td>
                          <Dropdown className="table-dropdown">
                            <Dropdown.Toggle variant="success">
                              <i className="fa fa-ellipsis-v drop-icon"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <div >
                                  <Link to={`/loan/edit/${item.id}`} className='fa fa-pencil'>
                                      Edit
                                  </Link>


                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                  <Link to={`/loan/detail/${item.id}`} className='fa fa-eye'>
                                      Detail
                                  </Link>


                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                <Link to={`/customer-loandetail-payment/${item.id}`} className='fa fa-money'>
                                      Pay
                                  </Link>
                                </div>
                              </Dropdown.Item>
                              {/* <Dropdown.Item>
                                <div >
                                <a variant="danger" className="fa fa-trash" onClick={()=>deleteLoan(item.id)}>
                                    Delete
                                </a>
                                </div>
                              </Dropdown.Item> */}

                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
                <Pagination
                    activePage={loans?.current_page ? loans?.current_page : 0}
                    itemsCountPerPage={loans?.per_page ? loans?.per_page : 0 }
                    totalItemsCount={loans?.total ? loans?.total : 0}
                    onChange={(pageNumber) => {

                      fetchLoans(pageNumber)


                    }}
                    // onDoubleClick={(e) => {
                    //     e.stopPropagation();
                    //   }}
                    // pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
          </TabPanel>
          <TabPanel className="today tabdetail"id="tabtoday">
          <table className="table">
              <thead>
                <tr>
                  <th>S.N </th>
                  <th>Name</th>
                  <th>Expire Time</th>
                  <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Loan Amount</th>
                  <th>Phone</th>

                  {/* <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Not Paid Date</th>
                  <th>Previous Information</th> */}
                  <th>Image</th>
                  {!props.hideUpdate && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {todayfollowup?.data?.map((item, index) => {


                    Moment.locale('en');
                    var dt = Date.parse(item.loan.due_date_eng);

                    var total_paid = 0;

                    var lastitem =  item.loan.loan_details[item.loan.loan_details.length-1]
                    var pay_date = lastitem?lastitem.created_at:"";
                    {item.loan.loan_details?.map((ldetail)=>{
                      total_paid += ldetail.paid_amount;

                    })}

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.loan.customer.name}</td>
                      <td>{Moment(dt).format('D MMM Y')}</td>
                      <td>{pay_date?Moment(pay_date).format('D MMM Y'):"Not Paid yet"}</td>
                      <td>{item.loan.loan_amount - total_paid}</td>
                      <td>{item.loan.loan_amount}</td>
                      <td>{item.loan.customer.phone}</td>
                      <td>
                      <Zoom>
                      <img width="50px" src={window.baseurl+`/storage/${item.loan.customer.image}`} />
                      </Zoom>
                      </td>
                      {/* <td>{item.totalDue}</td>
                      <td>{item.noPaidDate}</td>
                      <td>{item.previousInfo}</td>
                      <td>{item.contactno}</td> */}
                      {!props.hideUpdate && (
                        <td>
                          <Dropdown className="table-dropdown">
                            <Dropdown.Toggle variant="success">
                              <i className="fa fa-ellipsis-v drop-icon"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <div>
                                  <Link to={`/loan/edit/${item.loan.id}`} className='fa fa-pencil'>
                                      Edit
                                  </Link>
                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                  <Link to={`/loan/detail/${item.loan.id}`} className='fa fa-eye'>
                                      Detail
                                  </Link>


                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                <Link to={`/customer-loandetail-payment/${item.loan.id}`} className='fa fa-money'>
                                      Pay
                                  </Link>
                                </div>
                              </Dropdown.Item>
                              {/* <Dropdown.Item>
                                <div >
                                <a variant="danger" className="fa fa-trash" onClick={()=>deleteLoan(item.loan.id)}>
                                    Delete
                                </a>
                                </div>
                              </Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      )}
                    </tr>
                  );


                })}
              </tbody>
            </table>
            <div>
                <Pagination
                    activePage={todayfollowup?.current_page ? todayfollowup?.current_page : 0}
                    itemsCountPerPage={todayfollowup?.per_page ? todayfollowup?.per_page : 0 }
                    totalItemsCount={todayfollowup?.total ? todayfollowup?.total : 0}
                    onChange={(pageNumber) => {
                      fetchLoansTodayFollowUp(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
          </TabPanel>
          <TabPanel className="notcontacted tabdetail" id="tabnotconnected">
          <table className="table">
              <thead>
                <tr>
                  <th>S.N </th>
                  <th>Name</th>
                  <th>Expire Time</th>
                  <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Loan Amount</th>
                  <th>Phone</th>
                  <th>Make Contacted</th>

                  {/* <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Not Paid Date</th>
                  <th>Previous Information</th> */}
                  <th>Image</th>
                  {!props.hideUpdate && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {notcontactedtoday?.data?.map((item, index) => {



                    Moment.locale('en');
                    var dt = Date.parse(item.loan.due_date_eng);

                    var total_paid = 0;

                    var lastitem =  item.loan.loan_details[item.loan.loan_details.length-1]
                    var pay_date = lastitem?lastitem.created_at:"";
                    {item.loan.loan_details?.map((ldetail)=>{
                      total_paid += ldetail.paid_amount;

                    })}

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.loan.customer.name}</td>
                      <td>{Moment(dt).format('D MMM Y')}</td>
                      <td>{pay_date?Moment(pay_date).format('D MMM Y'):"Not Paid yet"}</td>
                      <td>{item.loan.loan_amount - total_paid}</td>
                      <td>{item.loan.loan_amount}</td>
                      <td>{item.loan.customer.phone}</td>
                      <td>
                      <Form.Check
                            type="switch"
                            id="custom-switch"
                            loan_id={item.loan_id}
                            installation_date={item.installation_date}
                            onChange={handelChangeContact}
                            checked={makeContacted}
                            // label="Check this switch"
                        />
                        {/* <label>
                        <input type="checkbox"

                        />
                        Check Me!
                        </label> */}
                      </td>
                      <td>
                      <Zoom>
                      <img width="50px" src={window.baseurl+`/storage/${item.loan.customer.image}`} />
                      </Zoom>
                      </td>
                      {/* <td>{item.totalDue}</td>
                      <td>{item.noPaidDate}</td>
                      <td>{item.previousInfo}</td>
                      <td>{item.contactno}</td> */}
                      {!props.hideUpdate && (
                        <td>
                          <Dropdown className="table-dropdown">
                            <Dropdown.Toggle variant="success">
                              <i className="fa fa-ellipsis-v drop-icon"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <div>
                                  <Link to={`/loan/edit/${item.loan.id}`} className='fa fa-pencil'>
                                      Edit
                                  </Link>

                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                  <Link to={`/loan/detail/${item.loan.id}`} className='fa fa-eye'>
                                      Detail
                                  </Link>


                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                <Link to={`/customer-loandetail-payment/${item.loan.id}`} className='fa fa-money'>
                                      Pay
                                  </Link>
                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div
                                  onClick={() => {
                                    openModal(item.loan_id,item.installation_date);
                                  }}
                                >
                                    <Link to="#"className='fa fa-pencil'>
                                    Reminder
                                  </Link>
                                  {/* <i className="fa fa-pencil"></i>Reminder */}
                                </div>
                              </Dropdown.Item>
                              {/* <Dropdown.Item>
                                <div >
                                <a variant="danger" className="fa fa-trash" onClick={()=>deleteLoan(item.loan.id)}>
                                    Delete
                                </a>
                                </div>
                              </Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      )}
                    </tr>
                  );

                })}
              </tbody>
            </table>
            <div>
                <Pagination
                    activePage={notcontactedtoday?.current_page ? notcontactedtoday?.current_page : 0}
                    itemsCountPerPage={notcontactedtoday?.per_page ? notcontactedtoday?.per_page : 0 }
                    totalItemsCount={notcontactedtoday?.total ? notcontactedtoday?.total : 0}
                    onChange={(pageNumber) => {
                      fetchLoansTodayFollowUp(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
          </TabPanel>
          <TabPanel className="reminder">
          <table className="table">
              <thead>
                <tr>
                  <th>S.N </th>
                  <th>Name</th>
                  <th>Expire Time</th>
                  <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Loan Amount</th>
                  <th>Phone</th>

                  {/* <th>Pay Date</th>
                  <th>Total Due</th>
                  <th>Not Paid Date</th>
                  <th>Previous Information</th> */}
                  <th>Image</th>
                  {!props.hideUpdate && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {remindertoday?.data?.map((item, index) => {



                    Moment.locale('en');
                    var dt = Date.parse(item.loan.due_date_eng);

                    var total_paid = 0;

                    var lastitem =  item.loan.loan_details[item.loan.loan_details.length-1]
                    var pay_date = lastitem?lastitem.created_at:"";
                    {item.loan.loan_details?.map((ldetail)=>{
                      total_paid += ldetail.paid_amount;

                    })}

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.loan.customer.name}</td>
                      <td>{Moment(dt).format('D MMM Y')}</td>
                      <td>{pay_date?Moment(pay_date).format('D MMM Y'):"Not Paid yet"}</td>
                      <td>{item.loan.loan_amount - total_paid}</td>
                      <td>{item.loan.loan_amount}</td>
                      <td>{item.loan.customer.phone}</td>
                      <td>
                      <Zoom>
                      <img width="50px" src={window.baseurl+`/storage/${item.loan.customer.image}`} />
                      </Zoom>
                      </td>
                      {/* <td>{item.totalDue}</td>
                      <td>{item.noPaidDate}</td>
                      <td>{item.previousInfo}</td>
                      <td>{item.contactno}</td> */}
                      {!props.hideUpdate && (
                        <td>
                          <Dropdown className="table-dropdown">
                            <Dropdown.Toggle variant="success">
                              <i className="fa fa-ellipsis-v drop-icon"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <div
                                  // onClick={() => {
                                  //   openModal();
                                  // }}
                                >
                                  <Link to={`/loan/edit/${item.loan.id}`} className='fa fa-pencil'>
                                      Edit
                                  </Link>

                                  {/* <i className="fa fa-pencil"></i>Edit */}
                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                  <Link to={`/loan/detail/${item.loan.id}`} className='fa fa-eye'>
                                      Detail
                                  </Link>


                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div >
                                <a variant="danger" className="fa fa-trash" onClick={()=>deleteLoan(item.loan.id)}>
                                    Delete
                                </a>
                                </div>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      )}
                    </tr>
                  );

                })}
              </tbody>
            </table>
            <div>
                <Pagination
                    activePage={todayfollowup?.current_page ? todayfollowup?.current_page : 0}
                    itemsCountPerPage={todayfollowup?.per_page ? todayfollowup?.per_page : 0 }
                    totalItemsCount={todayfollowup?.total ? todayfollowup?.total : 0}
                    onChange={(pageNumber) => {
                      fetchLoansTodayFollowUp(pageNumber)
                    }}
                    pageRangeDisplayed={8}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First Page"
                    lastPageText="Last Lage"
                />
            </div>
          </TabPanel>
        </Tabs>

        {/* true check gareko  */}
        {visible && (
          <Popup
            visible={visible}
            closeModal={closeModal}
            renderComponent={<ReminderForm />}
            reminderLoanId={reminderLoanId}
            reminderInstallationDate={reminderInstallationDate}
          />
        )}
        {showViewForm && (
          <Popup
            visible={showViewForm}
            closeModal={closeViewModal}
            renderComponent={<ViewForm />}
          />
        )}
      </div>
    </>
  );
}
};

export const str = 'First';
