import "./EditForm.scss";
export const ReminderForm = () => {
  return (
    <>
      <div className="edit-form">
        <h4 className="title">Update your Information</h4>
        <form>
          <div className="form-group clearfix">
            <textarea
              type="text"
              className="form-control"
              placeholder="Type Here"
            />
            <button className="cl-btn">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};
