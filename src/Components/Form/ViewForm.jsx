import { Table } from "../Maincard/Table/Table";

export const ViewForm = () => {
  return (
    <>
      <div className="view-form">
        <h4 className="title">View Detail</h4>
        <Table hideUpdate={true} />
      </div>
    </>
  );
};
