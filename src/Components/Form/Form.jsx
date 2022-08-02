import "./Form.scss";
import React, { useEffect,useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import $ from 'jquery';
import moment from 'moment'

export const Form = () => {
  const[loantypes,setLoanTypes] = useState([]);
  const[fileArray,setFileArray] = useState([]);
  const[fileObj,setfileObj] = useState([]);

  const uploadMultipleFiles = (e)=>{
    // console.log(e.target.files[0]);
    e.preventDefault();
    var newStateArray = fileArray.slice();
    newStateArray.push(URL.createObjectURL(e.target.files[0]))//for single
    setFileArray(newStateArray);
    var newStateFileObj = fileObj;
    newStateFileObj.push(e.target.files[0])

    setfileObj(newStateFileObj)

  }

    const deleteImage = (e)=>{
        e.preventDefault()
        fileArray.splice(e.target.value, 1);
        fileObj.splice(e.target.value, 1);
        var newStateArray = fileArray.slice();

        setFileArray(newStateArray);
    }

  useEffect(()=>{
      fetchloantypes()
  },[])

  const fetchloantypes = (e)=>{
      axios.get('api/loan-type').then(({data})=>{
          setLoanTypes(data);
      })
  }
  // const [countries,setCountries]=useState([])
  // useEffect(()=>{
  //     fetchcountries()

  // },[])
  // const fetchcountries=async()=>{
  //   let countrys= [
  //     {id: 'AFG', name: 'Afghanistan'},
  //     {id: 'ALA', name: 'Åland Islands'},
  //     {id: 'ALB', name: 'Albania'}
  //   ]
  //   setCountries(countrys);
  // }
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [address,setAddress] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [company_name,setCompanyName] = useState("")
  const [company_address,setCompanyAddress] = useState("")
  const [loan_type,setLoanType] = useState("")
  const [loan_amount,setLoanAmount] = useState("")
  const [image, setImage] = useState()
  const [loan_duration, setLoanDuration] = useState()
  const [loan_purpose, setLoanPurpose] = useState()
  const [installation_type, setInstallationType] = useState("")
  const [recommend_to, setRecommendTo] = useState("")
  const [due_date, setDueDate] = useState("")
  const [issue_date, setIssueDate] = useState("")
  const [citizen_ship_no, setCitizenShipNo] = useState("")
  const [validationError,setValidationError] = useState({})
  const [intrest_rate,setIntrestRate] = useState("")


  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};
  const createsaving = async (e) => {
    e.preventDefault();
    const formdata = new FormData()
    formdata.append('name',name)
    formdata.append('address',address)
    formdata.append('phone',phone)
    formdata.append('email',email)
    formdata.append('company_name',company_name)
    formdata.append('loan_type',loan_type)
    formdata.append('loan_amount',loan_amount)
    formdata.append('loan_duration',loan_duration)
    formdata.append('image',image)
    formdata.append('loan_purpose',loan_purpose)
    formdata.append('installation_type',installation_type)
    formdata.append('recommend_to',recommend_to)
    formdata.append('due_date',due_date)
    formdata.append('issue_date',issue_date)
    formdata.append('citizen_ship_no',citizen_ship_no)
    formdata.append('intrest_rate',intrest_rate)
    fileObj.forEach((image_file)=>{
        formdata.append('multiple_files[]',image_file);
    })

    await axios.post('/api/loan',formdata).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate('/loan-list')
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          icon:"error",
          text:response.data.message
        })
      }
    })
  }

  var installationOptions = [
    { value: ' ', label: '--Select Installation Type--' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleInstallationTypeSelect = e => {
    setInstallationType(e.value);
  };


  const onChangeDuration = () => {
    var inputFiselds = document.getElementsByClassName('startdate');
            var rows = $(inputFiselds[0]);
            rows.trigger('click');

  };

    const onChangeStartDate = ({ bsDate, adDate }) => {
        setIssueDate(bsDate);
        const date = new Date(adDate)
        date.setMonth(date.getMonth() + parseInt(loan_duration))
        var converteddate = moment(date).format("YYYY-MM-DD");
        axios.get(`/api/convertdate`,{params:{convertto:'nepali',date:converteddate}}).then(({data})=>{

            setDueDate(data.nep_date_inNepali);
            var inputFields = document.getElementsByClassName('enddate');
            var row = $(inputFields[0]);
            row.val(data.nep_date_inEnglish);

        })

    };
    const onChangeEndDate = ({ bsDate, adDate }) => {
        setDueDate(bsDate);
    };
  // let countriesList = countries.length > 0
  //   	&& countries.map((item, i) => {
  //     return (
  //       <option key={i} value={item.id}>{item.name}</option>
  //     )
  //   }, this);
  return (
    <>
      {/* {
        Object.keys(validationError).length > 0 && (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger">
                <ul className="mb-0">
                  {
                    Object.entries(validationError).map(([key, value])=>(
                      <li key={key}>{value}</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        )
      } */}
      <div className="same-gap">
        <div className="loan-detail-form cl-form">
        <div class="row">
                <div className="btn-header-title d-flex">
                    <h4 className="title">Add Loan</h4>
                    <div className="btn-group">
                        <Link to={`/loan-list`} className='btn btn-primary'>
                            List
                        </Link>
                     </div>
                </div>

            </div>
          <form onSubmit={createsaving}>
            <div className="loan-form">
              <div className="section">
                <small>Personal Information</small>
                <div className="row ">
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        onChange = {(event)=>{
                          setName(event.target.value)
                        }}
                        placeholder="Full Name"
                        className="form-control"
                      />
                      {validationError.name != null && (
                        <p className="alert text-danger">{validationError.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="address"

                        onChange = {(event)=>{
                          setAddress(event.target.value)
                        }}

                        placeholder="Address"
                        className="form-control"
                      />
                      {validationError.address != null && (
                        <p className="alert text-danger">{validationError.address}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="phone"
                        onChange = {(event)=>{
                          setPhone(event.target.value)
                        }}
                        placeholder="Phone No"
                        className="form-control"
                      />
                      {validationError.phone != null && (
                        <p className="alert text-danger">{validationError.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        onChange = {(event)=>{
                          setEmail(event.target.value)
                        }}
                        placeholder="Email Id"
                        className="form-control"
                      />
                      {validationError.email != null && (
                        <p className="alert text-danger">{validationError.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="company_name"
                        onChange = {(event)=>{
                          setCompanyName(event.target.value)
                        }}
                        placeholder="Company Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="company_address"

                        onChange = {(event)=>{
                          setCompanyAddress(event.target.value)
                        }}

                        placeholder="Company Address"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        name="citizen_ship_no"

                        onChange = {(event)=>{
                          setCitizenShipNo(event.target.value)
                        }}

                        placeholder="Citizen Ship No"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <p>Loan Details</p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                        <label>Loan Type</label>
                      <select className="form-control" name="loan_type"
                       defaultValue={{ value: loan_type }}
                       onChange = {(event)=>{
                          setLoanType(event.target.value)
                        }}>
                        <option value="0">--Select Loan Type--</option>
                        {loantypes?.map((items)=>{
                          return(
                            <option value={items.id}>{items.type} </option>
                          )
                        })}

                      </select>
                      {validationError.loan_type != null && (
                        <p className="alert text-danger">{validationError.loan_type}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Loan Amount</label>
                      <input
                        type="text"
                        name="loan_amount"
                        onChange = {(event)=>{
                          setLoanAmount(event.target.value)
                        }}
                        placeholder="Loan Amount"
                        className="form-control"
                      />
                      {validationError.loan_amount != null && (
                        <p className="alert text-danger">{validationError.loan_amount}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Loan Duration/Months</label>
                      <input
                        type="number"
                        name="loan_duration"

                        onChange = {(event)=>{
                          setLoanDuration(event.target.value)
                          onChangeDuration()
                        }}
                        placeholder="Loan Duration in Month"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                     <label>Loan Purpose</label>
                      <input
                        type="text"
                        name="loan_purpose"
                        onChange = {(event)=>{
                          setLoanPurpose(event.target.value)
                        }}
                        placeholder="Loan Purpose"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">

                    <label>Installation Type</label>
                      <Select
                      // name="installation_type"
                      options={installationOptions}
                      onChange={handleInstallationTypeSelect}

                      // onChange = {(event)=>{
                      //    setInstallationType(event.target.value)
                      //  }}
                      value={installationOptions.filter(function(option) {
                        return option.value === installation_type;
                      })}
                       >
                        {/* <option value="0">Installment Type</option>
                        <option value="1">Home Loan</option>
                        <option value="2">Installment Type</option>
                        <option value="3">Home Loan</option> */}
                      </Select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                         <label>Recommend To</label>
                      <input
                        type="text"

                        name="recommend_to"

                       onChange = {(event)=>{
                           setRecommendTo(event.target.value)
                         }}
                        placeholder="Recommend to"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Intrest Rate</label>
                    <input type="number" onChange={(e)=>{setIntrestRate(e.target.value)}} placeholder="Intrest Rate" className="form-control" step=".01"/>
                    {validationError.intrest_rate != null && (
                        <p className="alert text-danger">{validationError.intrest_rate}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Start date</label>
                      <Calendar className="form-control startdate"  theme='deepdark' onChange={onChangeStartDate} />
                      {/* <input
                       class="form-control"
                        type="date"
                        name="issue_date"
                        onChange={(event)=>{
                          setIssueDate(event.target.value)
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>End date</label>
                      <Calendar className="form-control enddate"  theme='deepdark' onChange={onChangeEndDate} />
                      {/* <input
                       class="form-control"
                        type="date"
                        name="due_date"
                        onChange={(event)=>{
                          setDueDate(event.target.value)
                        }}
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                        <label>Choose User Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={changeHandler}
                        placeholder="Company Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group multi-preview">
                    <div class="row">
                        {(fileArray || []).map((url,index)=> (
                            <div class="col-md-2">
                                <img src={url} alt="..." height="100" width="100"/>&nbsp;<button className="fa fa-trash alert alert-danger" title="Remove" onClick={deleteImage} value={index}></button>
                            </div>

                        ))}
                    </div>
                </div>

                    <div className="form-group col-md-4">
                        <label>Choose Files</label>
                        <input type="file" className="form-control" onChange={uploadMultipleFiles} />
                    </div>
                  <div className="btn-group text-center d-block">
                    <button className="cl-btn">Save Details</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
