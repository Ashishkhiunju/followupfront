import SentReminderDataTable from "./SentReminderDataTable";
import "../DataTable/DataTable.scss";

export const SentReminder = ()=>{
    return (
        <div className="card">
        {/* <div className="card-header">Users</div> */}
        <div className="card-body">
            <SentReminderDataTable
                fetchUrl="/api/sent-reminders"
                columns={["customer_name","customer_email",'loan_purpose',"reminder_date", "send_via"]}
            ></SentReminderDataTable>
        </div>
    </div>
    )
}

