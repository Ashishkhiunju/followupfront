import "./InfoCard.scss";
import {useEffect,useState} from 'react';
import axios from "axios";

export const InfoCard = () => {

    const[dashData,setDashData] = useState({});
    useEffect(()=>{
        fetchDashBoardData();
    },[])

    const fetchDashBoardData = ()=>{
        axios.get('/api/dashboard-datas').then(({data})=>{
            setDashData(data);
        })
    }
console.log(dashData.loan_contacts_today);
  const data = [
    {
      title: "Follow up today",
      number: dashData.loan_installation_today,
      icon: <i className="fa fa-hand-stop-o icon"></i>,
    },
    {
      title: "Contact today",
      number: dashData.loan_contacts_today,
      icon: <i className="fa fa-phone icon"></i>,
    },
    {
      title: "Dis Contact today",
      number: dashData.not_contacts_today,
      icon: <i className="fa fa-ban icon"></i>,
    },
    {
      title: "Saving today",
      number: dashData.saving_today,
      icon: <i className="fa fa-money icon"></i>,
    },
    {
      title: "Deposit",
      number: 96,
      icon: <i className="fa fa-credit-card icon"></i>,
    },
    {
      title: "No Deposit",
      number: 96,
      icon: <i className="fa fa-ban icon"></i>,
    },
  ];

  return (
    <>
      <div className="same-gap">
        <div className="row">
          {data?.map((item, index) => {
            return (
              <div className="col-12 col-sm-6 col-lg-4" key={index}>
                <div className="info-card ">
                  <div className="info-title">
                    <h5 className="title">{item.title}</h5>
                    <span>{item.number}</span>
                  </div>
                  <div className="info-icon">{item.icon}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
