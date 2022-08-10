import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Components/Header/Header";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { LoanList } from "./Components/Loan/LoanList";
// import { str } from "./Components/Loan/LoanList";

import { LoanEdit } from "./Components/Loan/LoanEdit";
import { LoanDetail } from "./Components/Loan/LoanDetail";
import { LoanForm } from "./Components/Loan/LoanForm";
import { LoanTypeForm } from "./Components/Loan/LoanTypeForm";
import { LoanTypeList } from "./Components/Loan/LoanTypeList";
import { LoanTransfer } from "./Components/Loan/LoanTransfer";
import { UsersLoan } from "./Components/Loan/UsersLoan";
import { UsersAllLoan } from "./Components/Loan/UsersAllLoan";

import { SavingForm } from "./Components/Saving/SavingForm";
import { SavingList } from "./Components/Saving/SavingList";
import { SavingPreserveForm } from "./Components/Saving/SavingPreserveForm";
import { SavingWithdrawForm } from "./Components/Saving/SavingWithdrawForm";

import { RecommenderForm } from "./Components/Recommender/RecommenderForm";
import { RecommenderList } from "./Components/Recommender/RecommenderList";
import { RecommenderEdit } from "./Components/Recommender/RecommenderEdit";

import { CustomerForm } from "./Components/Customer/CustomerForm";
import { CustomerList } from "./Components/Customer/CustomerList";
import { CustomerEdit } from "./Components/Customer/CustomerEdit";
import { Customers } from "./Components/Customer/Customers";
import { CustomerLoanDetail } from "./Components/Customer/CustomerLoanDetail";
import { CustomerLoanPaymentForm } from "./Components/Customer/CustomerLoanPaymentForm";
import { Form } from "./Components/Form/Form";
import { Home } from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate, Link, useParams } from "react-router-dom";

import { Table } from "./Components/Maincard/Table/Table";
import { LoanFollowForm } from "./Components/Form/LoanFollowForm";

import { EditForm } from "./Components/Form/ReminderForm";
import { ViewForm } from "./Components/Form/ViewForm";
import { useState, useEfect, useEffect } from "react";

import { Register } from "./Components/Auth/Register";
import { Login } from "./Components/Auth/Login";
import { UserForm } from "./Components/User/UserForm";
import { UserList } from "./Components/User/UserList";
import { UserEdit } from "./Components/User/UserEdit";

import { SentReminder } from "./Components/Reminder/SentReminder";

import axios from "axios";
import "./App.css";
// http://127.0.0.1:8000/
// http://sub.xinzatech.com/
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const App = () => {
  // const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const sideBarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    makeInstallationContactForToday(); //must have cornjob
    createLoanIntrestToday(); //must have cornjob
    checkSessionTime();
    sendMail();
    // runsedular();
  }, []);

  const makeInstallationContactForToday = () => {
    axios.get("api/installationContactForToday").then(({ data }) => {});
  };
  const sendMail = () => {
    axios.get("api/sendMail").then(({ data }) => {});
  };

  const runsedular=()=>{
    axios.get("api/runsedular").then(({ data }) => {});
  }

  const createLoanIntrestToday = () => {
    axios.post("api/loanintrest").then(({ data }) => {
      // console.log(data);
    });
  };

  const checkSessionTime = () => {
    let newDate = new Date();
    let time = newDate.getTime();
    var sessionttl = localStorage.getItem("ttl");

    if (sessionttl < time) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      localStorage.removeItem("role");
      localStorage.removeItem("ttl");
      localStorage.removeItem("user_id");
      if (window.location.pathname != "/") {
        window.location.href = "/";
      }
    }
  };
  axios
    .get(`api/authenticate`)
    .then(({ data }) => [])
    .catch(({ response }) => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      localStorage.removeItem("role");
      if (window.location.pathname != "/") {
        window.location.href = "/";
      }
    });

  if (!localStorage.getItem("auth_token")) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="*" Navigate={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <div
            className={`site-content ${
              showSidebar === false ? "hide-dashboard" : ""
            }`}
          >
            <aside className="widget-area  leftsidebar">
              <Sidebar showSidebar={showSidebar} />
            </aside>

            <section className="wrapper-content">
              <Header sideBarToggle={sideBarToggle} showSidebar={showSidebar} />

              {localStorage.getItem("role") == 1 && (
                <Routes>
                  <Route path="/add-user" element={<UserForm />} />
                  <Route path="/user-list" element={<UserList />} />
                  <Route path="/user-edit/:id" element={<UserEdit />} />
                  <Route path="/loan-transfer" element={<LoanTransfer />} />
                  <Route path="/users-loan" element={<UsersLoan />} />
                  <Route path="/users-loan/:id" element={<UsersAllLoan />} />
                </Routes>
              )}
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/add-item" element={<Form />} />
                <Route path="/add-loan" element={<LoanForm />} />
                <Route path="/all-list" element={<Table />} />
                <Route path="/loan-follow-up" element={<LoanFollowForm />} />
                <Route path="/loan-list" element={<LoanList />} />
                <Route path="/loan/edit/:id" element={<LoanEdit />} />
                <Route path="/loan/detail/:id" element={<LoanDetail />} />
                <Route path="/loan-type-create" element={<LoanTypeForm />} />
                <Route path="/loan-type-list" element={<LoanTypeList />} />

                <Route path="add-customer" element={<CustomerForm />} />
                {/* <Route path="list-customer" element={<CustomerList />}/> */}
                <Route path="list-customer" element={<Customers />} />

                <Route
                  path="customer-loandetail/:id"
                  element={<CustomerLoanDetail />}
                />
                <Route path="customer-edit/:id" element={<CustomerEdit />}/>
                <Route
                  path="customer-loandetail-payment/:loanid"
                  element={<CustomerLoanPaymentForm />}
                />

                <Route path="saving/create" element={<SavingForm />} />
                <Route path="saving-list" element={<SavingList />} />
                <Route
                  path="saving-preserve/:id"
                  element={<SavingPreserveForm />}
                />
                <Route
                  path="saving-withdraw/:id"
                  element={<SavingWithdrawForm />}
                />

                <Route
                  path="recommender/create"
                  element={<RecommenderForm />}
                />
                <Route path="recommender/list" element={<RecommenderList />} />
                <Route
                  path="recommender-edit/:id"
                  element={<RecommenderEdit />}
                />
                <Route path="sent-reminders" element={<SentReminder/>}/>
              </Routes>
            </section>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
