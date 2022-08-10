import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";



export const CustomerForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [citizen_ship_no, setCitizenShipNo] = useState("");
  const [image, setImage] = useState();
  const [company_address, setCompanyAddress] = useState("");
  const [validationError, setValidationError] = useState({});
  const [fileArray, setFileArray] = useState([]);
  const [fileObj, setfileObj] = useState([]);

  const uploadMultipleFiles = (e) => {
    // console.log(e.target.files[0]);
    e.preventDefault();
    var newStateArray = fileArray.slice();
    newStateArray.push(URL.createObjectURL(e.target.files[0])); //for single
    setFileArray(newStateArray);
    var newStateFileObj = fileObj;
    newStateFileObj.push(e.target.files[0]);

    setfileObj(newStateFileObj);
  };

  const deleteImage = (e) => {
    e.preventDefault();
    fileArray.splice(e.target.value, 1);
    fileObj.splice(e.target.value, 1);
    var newStateArray = fileArray.slice();

    setFileArray(newStateArray);
  };

  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitCustomer = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("address", address);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("company_name", company_name);
    formdata.append("citizen_ship_no", citizen_ship_no);
    formdata.append("company_address", company_address);
    formdata.append("image", image);
    fileObj.forEach((image_file) => {
        formdata.append("multiple_signatures[]", image_file);
      });

    await axios
      .post("/api/customers", formdata)
      .then(({ data }) => {

        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/list-customer");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            icon: "error",
            text: response.data.message,
          });
        }
      });
  };
  return (
    <div className="same-gap">
      <div className="loan-detail-form cl-form">
        <div class="row">
          <div className="btn-header-title d-flex">
            <h4 className="title">Add Customer</h4>
            <div className="btn-group">
              <Link to={`/list-customer`} className="btn btn-primary">
                List
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={submitCustomer}>
          <div className="loan-form">
            <div className="section">
              <small>Personal Information</small>
              <div className="row ">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                      placeholder="Full Name"
                      className="form-control"
                    />
                    {validationError.name != null && (
                      <p className="alert text-danger">
                        {validationError.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      placeholder="Address"
                      className="form-control"
                    />
                    {validationError.address != null && (
                      <p className="alert text-danger">
                        {validationError.address}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      placeholder="Phone No"
                      className="form-control"
                    />
                    {validationError.phone != null && (
                      <p className="alert text-danger">
                        {validationError.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      placeholder="Email Id"
                      className="form-control"
                    />
                    {validationError.email != null && (
                      <p className="alert text-danger">
                        {validationError.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      onChange={(event) => {
                        setCompanyName(event.target.value);
                      }}
                      placeholder="Company Name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Company Adderss</label>
                    <input
                      type="text"
                      name="company_address"
                      onChange={(event) => {
                        setCompanyAddress(event.target.value);
                      }}
                      placeholder="Company Address"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Citizen Ship Number</label>
                    <input
                      type="text"
                      name="citizen_ship_no"
                      onChange={(event) => {
                        setCitizenShipNo(event.target.value);
                      }}
                      placeholder="Citizen Ship No"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Customer Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={changeHandler}
                      placeholder="Company Name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  {image && (
                    <img
                      style={{ width: "100px" }}
                      height="100"
                      src={URL.createObjectURL(image)}
                    />
                  )}
                </div>
                <div className="form-group multi-preview">
                  <div class="row">
                    {(fileArray || []).map((url, index) => (
                      <div class="col-md-2">
                        <img src={url} alt="..." height="100" width="100" />
                        &nbsp;
                        <button
                          className="fa fa-trash alert alert-danger"
                          title="Remove"
                          onClick={deleteImage}
                          value={index}
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group col-md-4">
                  <label>Choose Signatures</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={uploadMultipleFiles}
                  />
                </div>
              </div>

            </div>


            <div className="btn-group text-center d-block">
              <button className="cl-btn">Save Details</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
