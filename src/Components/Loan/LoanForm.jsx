import "../Form/Form.scss";
import React, { useEffect,useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import $ from 'jquery';

import moment from 'moment'
import ImageUploadPreviewComponent from '../ImageUpload/ImageUploadPreviewComponent'

export const LoanForm = (props) => {

  const[buttonDisabled,setButtonDisabled] = useState(false)
  const[loantypes,setLoanTypes] = useState([]);
  const[customerOptions,setCustomerOptions] = useState([]);
  const[recommenderOptions,setRecommenderOptions] = useState([]);
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
    document.title = 'Loan'
      fetchloantypes()
      fetchCustomers()
      fetchRecommenders()
  },[])

  const fetchloantypes = (e)=>{
      axios.get('api/loan-type').then(({data})=>{
          setLoanTypes(data);
      })
  }

  const fetchCustomers = (e)=>{
    axios.get(`/api/customer/list`).then(({data})=>{

        setCustomerOptions(data);

    })
  }
  const fetchRecommenders = (e)=>{
    axios.get('/api/recommender-list').then(({data})=>{
        setRecommenderOptions(data);
    })
  }


  const navigate = useNavigate()
  const [customerid,setCustomerID] = useState("")
  const [recommenderid,setRecommenderId] = useState("")

  const [loan_type,setLoanType] = useState("")
  const [loan_amount,setLoanAmount] = useState("")
//   const [image, setImage] = useState()
  const [loan_duration, setLoanDuration] = useState()
  const [loan_purpose, setLoanPurpose] = useState()
  const [installation_type, setInstallationType] = useState("")
  const [recommend_to, setRecommendTo] = useState("")
  const [due_date, setDueDate] = useState()
  const [issue_date, setIssueDate] = useState("")
  const [citizen_ship_no, setCitizenShipNo] = useState("")
  const [validationError,setValidationError] = useState({})
  const [intrest_rate,setIntrestRate] = useState('')

//   const changeHandler = (event) => {
// 		setImage(event.target.files[0]);
// 	};
  const createloan = async (e) => {
    setButtonDisabled(true)
    e.preventDefault();


    const formdata = new FormData()
    formdata.append('customer_id',customerid)
    formdata.append('recommender_id',recommenderid)
    formdata.append('loan_type',loan_type)
    formdata.append('loan_amount',loan_amount)
    formdata.append('loan_duration',loan_duration)
    // formdata.append('image',image)
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


    await axios.post(`/api/loan`,formdata).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate('/loan-list')
      setButtonDisabled(false)
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)

      }else{
        Swal.fire({
          icon:"error",
          text:response.data.message
        })
      }
      setButtonDisabled(false)
    })
  }

  var installationOptions = [
    { value: ' ', label: '--Select Installation Type--' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekely' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleInstallationTypeSelect = e => {
    setInstallationType(e.value);
  };

  const changeCustomer = e =>{
    setCustomerID(e.value)
  }

  const changeRecommender = (e)=>{
    setRecommenderId(e.value)
  }

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

  return (
    <>

      <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <form onSubmit={createloan}>
            <div className="loan-form">
                <div className="btn-header-title d-flex">
                    <h4 className="title">Add Loan</h4>
                <div className="btn-group">
                    <Link to={`/loan-list`} className='btn cl-btn'>
                        List
                    </Link>
                    <Link to={`/add-item`} className='btn border-btn'>
                        New Customer Loan
                    </Link>
                </div>
                </div>
              <div className="section">
                <p>Loan Details</p>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                        <label>Select Customer</label>
                        <Select

                        options={customerOptions}
                        onChange={changeCustomer}
                        >

                        </Select>
                        {validationError.customer_id != null && (
                            <p className="alert text-danger">{validationError.customer_id}</p>
                        )}
                        </div>
                    </div>


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
                        placeholder="Loan Duration in Months"
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
                    <input type="number" name="intrest_rate" onChange={(e)=>{setIntrestRate(e.target.value)}} placeholder="Intrest Rate" className="form-control" step=".01"/>
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
                      <Calendar  className="form-control enddate" theme='deepdark' value={due_date} onChange={onChangeEndDate} />
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
                        <label>Responsible For</label>
                        <input type="text" className="form-control" readOnly value={localStorage.getItem('auth_name')}/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                        <label>Recommended By</label>
                        <Select

                        // value={recommenderOptions.find(({ value }) => value === '1')}
                        options={recommenderOptions}
                        onChange={changeRecommender}
                        />


                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="form-group">
                    <label>Choose File</label>
                      <input
                        type="file"
                        name="image"
                        onChange={changeHandler}
                        placeholder="Company Name"
                        className="form-control"
                      />
                    </div>
                  </div> */}
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
                  {/* <ImageUploadPreviewComponent /> */}
                  <div className="btn-group text-center d-block">
                    <button className="cl-btn" disabled={buttonDisabled}>Save Details</button>
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
