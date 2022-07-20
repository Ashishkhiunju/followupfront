import "./Popup.scss";
import Modal from "react-awesome-modal";
import React,{useState,useEffect} from 'react';
import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import axios from "axios";
import Swal from "sweetalert2";

export const Popup = (props) => {
    const [visibleModel,SetVisibleModel] = useState('');
    useEffect(()=>{
        SetVisibleModel(props.visible);
    },[])

    const loan_id = props.reminderLoanId;
    const installation_date = props.reminderInstallationDate;
    const[reminderDate,setReminderDate]=useState('');
    const[reminderDetail,setReminderDetail]=useState('');

    const onChangeDate = ({ bsDate, adDate }) => {
        setReminderDate(bsDate);

    };



    const reminderSubmit=(e)=>{
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('loan_id',loan_id)
        formdata.append('installation_date',installation_date)
        formdata.append('reminderDate',reminderDate)
        formdata.append('reminderDetail',reminderDetail)
        axios.post('/api/loan/makereminder',formdata).then(({data})=>{
            SetVisibleModel(false);
            if(data.status === "200"){
                Swal.fire({
                    icon:"success",
                    text:data.message
                })
            }else{
                Swal.fire({
                    icon:"error",
                    text:data.message
                })
            }

        })
    }

  return (
    <div className="popup">
      <Modal
        visible={visibleModel}
        width="70%"
        effect="fadeInUp"
        onClickAway={() => props.closeModal()}
      >
        <div className="modal-body">
          {/* to close popup */}
          <span className="close" onClick={() => props.closeModal()}>
            X
          </span>
          {/* component to be render */}
          {/* {props.renderComponent} */}
          <div className="edit-form">
        <h4 className="title">Update your Information</h4>
        <form onSubmit={reminderSubmit}>

          <div className="form-group clearfix">
            <div class="form-group">
                <label>Reminder Detail</label>
                <textarea
                type="text"
                className="form-control"
                placeholder="Type Here"
                onChange={(e)=>{
                    setReminderDetail(e.target.value)
                }}
                />
            </div>
            <div class="form-group">
                <label>Reminder Date</label>
                <Calendar className="form-control"  theme='deepdark' onChange={onChangeDate} />
             </div>
            <button className="cl-btn">Update</button>
          </div>
        </form>
      </div>
        </div>
      </Modal>
    </div>
  );
};
