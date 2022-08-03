import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import UserLoanDataTable from "./UserLoanDataTable";
import "../DataTable/DataTable.scss";
import $ from "jquery";
import {useNavigate} from 'react-router-dom';

export const UsersLoan = () => {
    const navigate = useNavigate();
  const [userOptions, setUserOptions] = useState({});
  const [url, setUrl] = useState("");

  useEffect(() => {
    document.title = "User Loan";
    fetchusers();
  }, []);

  const fetchusers = () => {
    axios.get(`/api/user/list`).then(({ data }) => {
      setUserOptions(data);
    });
  };

  const handleChangeUser = (e) => {
    // setUrl("/api/users-loan/" + e.value);
    navigate('/users-loan/'+e.value);

  };

  return (
    <>
      <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <div className="loan-form">
            <div className="btn-header-title d-flex">
              <div className="btn-group"></div>
            </div>
            <div className="section">
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Select User</label>
                  <Select
                    options={userOptions}
                    onChange={handleChangeUser}
                  ></Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {url && (
        <div className="card" id="replaceTable">
          {/* <div className="card-header">Users</div> */}
          <div className="card-body">
            <UserLoanDataTable
              fetchUrl={url}
              columns={["name", "installation_type", "loan_amount", "action"]}
            ></UserLoanDataTable>
          </div>
        </div>
      )}
    </>
  );
};
