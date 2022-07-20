import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Swal from 'sweetalert2';


export const SavingForm = ()=>{

    const[customerOptions,setCustomerOptions]=useState({});
    const [validationError,setValidationError] = useState({});
    const [customer_id,setCustomerId] = useState('');
    const [saving_type,setSavingType] = useState('');
    const [saving_amount,setSavingAmount] = useState('');
    const [intrest_rate,setIntrestRate] = useState('');
    const [issue_date,setIssueDate] = useState('');
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
        document.title = 'Saving'

          fetchCustomers()
      },[])

      const fetchCustomers = (e)=>{
        axios.get(`/api/customer/list`).then(({data})=>{

            setCustomerOptions(data);

        })
      }

    const changeCustomer = (e)=>{
        setCustomerId(e.value);
    }

    const onChangeIssueDate=({ bsDate, adDate })=>{
        setIssueDate(bsDate)
    }

    const createSaving = (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('customer_id',customer_id);
        formdata.append('saving_type',saving_type);
        formdata.append('saving_amount',saving_amount);
        formdata.append('intrest_rate',intrest_rate);
        formdata.append('issue_date',issue_date);
        fileObj.forEach((image_file)=>{
            formdata.append('multiple_files[]',image_file);
        })
        axios.post('api/saving',formdata).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message,
            })
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


    return (
        <div className="same-gap">
        <div className="loan-detail-form cl-form">
          <form onSubmit={createSaving}>
            <div className="loan-form">
                <div className="btn-header-title d-flex">
                    <h4 className="title">Add Saving</h4>
                <div className="btn-group">
                    <Link to={`/saving-list`} className='btn cl-btn'>
                        List
                    </Link>
                    {/* <Link to={`/add-item`} className='btn border-btn'>
                        New Customer Loan
                    </Link> */}
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
                    <label>Saving Type</label>
                      <select className="form-control" name="loan_type"

                       onChange = {(event)=>{
                          setSavingType(event.target.value)
                        }}>
                        <option value="">--Select Saving Type--</option>
                        <option value="saving">Saving</option>
                        <option value="current">Current</option>


                      </select>
                      {validationError.saving_type != null && (
                        <p className="alert text-danger">{validationError.saving_type}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                    <label>Saving Amount</label>
                      <input
                        type="number"

                        onChange = {(event)=>{
                          setSavingAmount(event.target.value)
                        }}
                        placeholder="Saving Amount"
                        className="form-control"
                      />
                      {validationError.saving_amount != null && (
                        <p className="alert text-danger">{validationError.saving_amount}</p>
                      )}
                    </div>
                  </div>



                  <div className="col-md-4">
                    <div className="form-group">
                     <label>Intrest Rate</label>
                    <input type="number" name="intrest_rate" onChange={(e)=>{setIntrestRate(e.target.value)}} placeholder="Intrest Rate" className="form-control" step=".01"/>
                    {validationError.intrest_rate != null && (
                        <p className="alert text-danger">{validationError.intrest_rate}</p>
                      )}
                    </div>

                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Issue date</label>
                      <Calendar className="form-control startdate"  theme='deepdark' onChange={onChangeIssueDate} />
                      {validationError.issue_date != null && (
                        <p className="alert text-danger">{validationError.issue_date}</p>
                      )}
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


                  <div className="form-group multi-preview">
                    <div class="row">
                        {(fileArray || []).map((url,index)=> (
                            <div class="col-md-2">
                                <Zoom>
                                <img src={url} alt="..." height="100" width="100"/>
                                </Zoom>
                                &nbsp;<button className="fa fa-trash alert alert-danger" title="Remove" onClick={deleteImage} value={index}></button>
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
                    <button className="cl-btn">Save Details</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}
