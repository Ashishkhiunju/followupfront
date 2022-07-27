import "../Form/Form.scss";
import React, { useEffect,useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';


export const LoanEdit = (props) => {
    const { id } = useParams()

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
    const [loan_images, setLoanImage] = useState([])
    const [loan_duration, setLoanDuration] = useState()
    const [loan_purpose, setLoanPurpose] = useState()
    const [installation_type, setInstallationType] = useState("")
    const [recommend_to, setRecommendTo] = useState("")
    const [due_date, setDueDate] = useState("")
    const [issue_date, setIssueDate] = useState("")
    const[loantypes,setLoanTypes] = useState([]);
    const[intrestrate,setIntrestRate] = useState([]);
    const[recommender_name,setRecommenderName] = useState('');
    const[fileArray,setFileArray] = useState([]);
    const[fileObj,setfileObj] = useState([]);
    const[recommenderOptions,setRecommenderOptions] = useState([]);
    const [recommenderid,setRecommenderId] = useState("")

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

    const changeHandler = (event) => {
            setImage(event.target.files[0]);
        };

    useEffect(()=>{
        document.title = 'Loan Edit'
        fetchloans();
        fetchloantypes();
        fetchRecommenders();

      },[])


  const fetchloantypes = (e)=>{
      axios.get('api/loan-type').then(({data})=>{
          setLoanTypes(data);
      })
  }


    const fetchloans = async()=>{
        await axios.get(`/api/loan/${id}`).then(({data})=>{

          console.log(data);
            setName(data.loan.customer.name)
            setAddress(data.loan.customer.address)
            setPhone(data.loan.customer.phone)
            setEmail(data.loan.customer.email)
            setCompanyName(data.loan.customer.company_name)
            setCompanyAddress(data.loan.customer.company_address)
            setLoanType(data.loan.loan_type)
            setLoanAmount(data.loan.loan_amount)
            setImage(data.loan.customer.image)
            setLoanDuration(data.loan.loan_duration)
            setLoanPurpose(data.loan.loan_purpose)
            setInstallationType(data.loan.installation_type)
            setRecommendTo(data.loan.recommend_to)
            setDueDate(data.loan.due_date_nep)
            setIssueDate(data.loan.issue_date_nep)
            setIntrestRate(data.loan.intrest_rate)
            setRecommenderName(data.loan.recommender?.name)
            setRecommenderId(data.loan.recommender_id)
            setLoanImage(data.loan.loan_images)

        })
    }

    const updateLoan = async(e)=>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('_method', 'PATCH');
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
        formdata.append('issue_date',issue_date)
        formdata.append('due_date',due_date)
        formdata.append('recommender_id',recommenderid)
        fileObj.forEach((image_file)=>{
            formdata.append('multiple_files[]',image_file);
        })

        await axios.post(`/api/loan/${id}`,formdata).then(({data})=>{
            Swal.fire({
              icon:"success",
              text:data.message
            })
            navigate('/loan-list')
          }).catch(({response})=>{
            console.log(response);


          })
    }



    const onChangeStartDate = ({ bsDate, adDate }) => {
		setIssueDate(bsDate);
	};
    const onChangeEndDate = ({ bsDate, adDate }) => {
		setDueDate(bsDate);
	};

    const removeLoanImage = async(e)=>{
        e.preventDefault();
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
        var imageid = e.target.dataset.id;
        const formdata = new FormData();
        formdata.append('image_id',imageid);
        await axios.post(`api/delete-loan-image`,formdata).then(({data})=>{
           Swal.fire({
            icon:'success',
            text:data.message
           })
           fetchloans()
        }).catch(({response})=>{
            Swal.fire({
                icon:'error',
                text:response.data.message
            })
        })
        console.log(e.target.dataset.id)
    }

    const fetchRecommenders = (e)=>{
        axios.get('/api/recommender-list').then(({data})=>{
            setRecommenderOptions(data);
        })
      }
    const selectedRecomender = recommenderOptions.find(x => x.value===recommenderid);


    const changeRecommender = (e)=>{

    setRecommenderId(e.value)

    }

    return (
        <>
        {/* <div>
            <select>
              {countriesList}
            </select>
          </div> */}
          <div className="same-gap">
            <div className="loan-detail-form cl-form">
              <h4 className="title">Edit Loan </h4>
              <form onSubmit={updateLoan}>
                <div className="loan-form">
                  <div className="section">
                    <small>Personal Information</small>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="text"
                            value={name}
                            onChange = {(event)=>{
                              setName(event.target.value)
                            }}
                            placeholder="Full Name"
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="text"
                            value={address}
                            onChange = {(event)=>{
                              setAddress(event.target.value)
                            }}

                            placeholder="Addresse"
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="text"
                            value={phone}
                            onChange = {(event)=>{
                              setPhone(event.target.value)
                            }}
                            placeholder="Phone No"
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="text"
                            value={email}
                            onChange = {(event)=>{
                              setEmail(event.target.value)
                            }}
                            placeholder="Email Id"
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="text"
                            value={company_name}
                            onChange = {(event)=>{
                              setCompanyName(event.target.value)
                            }}
                            placeholder="Company Name"
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <input
                            type="text"
                            value={company_address}
                            onChange = {(event)=>{
                              setCompanyAddress(event.target.value)
                            }}

                            placeholder="Company Address"
                            className="form-control"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <small>Loan Details</small>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                            <label>Loan Type</label>
                          <select className="form-control" name="loan_type"

                           value={loan_type}
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
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label>Loan Amount</label>
                          <input
                            type="text"
                            value={loan_amount}
                            onChange = {(event)=>{
                              setLoanAmount(event.target.value)
                            }}
                            placeholder="Loan Amount"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label>Loan Duration/Months</label>
                          <input
                            type="text"
                            value={loan_duration}
                            onChange = {(event)=>{
                              setLoanDuration(event.target.value)
                            }}
                            placeholder="Loan Duration"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label>Loan Purpose</label>
                          <input
                            type="text"
                            value={loan_purpose}
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
                          <select class="form-control"

                          value={installation_type}
                           onChange={(e)=>{
                            setInstallationType(e.target.value);
                           }}

                           >
                            <option value="0" >--Select Installment Type--</option>
                            <option value="daily" >Daily</option>
                            <option value="weekly" > Weekly</option>
                            <option value="monthly" >Monthly</option>
                            <option value="yearly" >Yearly</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label>Recommend To</label>
                          <input
                            type="text"
                            value={recommend_to}
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
                            <label htmlFor="">Intrest Rate</label>
                            <input type="number" value={intrestrate} className="form-control"/>
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div className="form-group">
                        <label>Start date: {issue_date}</label>

                        <Calendar  className="form-control" theme='deepdark' defaultDate="" onChange={onChangeStartDate} />
                        {/* <input
                        class="form-control"
                          type="date"

                          value={issue_date}
                          onChange={(event)=>{
                            setIssueDate(event.target.value)
                          }}
                        /> */}
                      </div>
                    </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>End date: {due_date}</label>

                           <Calendar className="form-control" defaultDate="" theme='deepdark' onChange={onChangeEndDate} />
                          {/* <input
                          class="form-control"
                            type="date"

                            value={due_date}
                            onChange={(event)=>{
                              setDueDate(event.target.value)
                            }}
                          /> */}
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="">Recommended By</label>
                            {/* <input type="text" value={recommender_name} className="form-control" readOnly/>
                             */}
                             <Select

                                value = {{ value: selectedRecomender ? selectedRecomender.value : "", label: selectedRecomender ? selectedRecomender.label : ""} || ''}
                                // value={recommenderOptions.find(({ value }) => value === '1')}
                                options={recommenderOptions}
                                onChange={changeRecommender}
                                />
                        </div>
                      </div>
                      <div className="row">
                      {loan_images &&

                            loan_images.map((items)=>{
                                return(
                                    <div className="col-md-2">
                                    <img src={window.baseurl+"/storage/"+items.image} height="100" width="100"/><button className="fa fa-trash alert alert-danger" title="Remove" onClick={removeLoanImage} data-id={items.id}></button>
                                    </div>
                                )
                            })
                      }
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
                      {/* <img  height="100" src={window.baseurl+`/storage/`+image} /> */}
                      <div className="form-group multi-preview">
                        <hr/>
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
}
