import { useState, useCallback } from "react";
import TableRow from "./TableRow";
import "./TableRow.css";

const SpecificationTable = ({ specification }) => {
  const [data, setData] = useState(JSON.parse(specification) || []);

  const handleSaveData = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(data));
  };

  const handleResetData = () => {
    setData(JSON.parse(specification) || []);
  };

  const handleClearData = () => {
    setData([]);
  };

  const handleAddMoreLine = (e) => {
    e.preventDefault();
    setData([
      ...data,
      {
        index: crypto.randomUUID(),
        attribute: "",
        value: ""
      }
    ]);
  };

  const handleChangeValue = useCallback((e, key, item_edit) => {
    e.preventDefault();
    item_edit[key] = e.target.value;
    setData((prev) =>
      prev.map((item) => {
        if (item.index === item_edit.index) {
          return item_edit;
        }
        return item;
      })
    );
  }, []);

  const handleRemoveLine = useCallback((id) => {
    setData((prev) => prev.filter((item) => item.index !== id));
  }, []);

  return (
    <div className="container">
      <div className="btn-group btn-group-sm d-flex">
        <button className="btn btn-outline-success" onClick={handleSaveData}>
          Save
        </button>
        <button className="btn btn-outline-secondary" onClick={handleResetData}>
          Reset
        </button>
        <button className="btn btn-outline-danger" onClick={handleClearData}>
          Clear
        </button>
      </div>
      <div className="mt-2 table-responsive">
        <table className="table table-bordered border-dark table-sm">
          <thead className="bg-primary text-white">
            <tr className="text-center">
              <th>Attribute</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <TableRow
                key={item.index}
                item={item}
                handleChangeValue={handleChangeValue}
                handleRemoveLine={handleRemoveLine}
              />
            ))}
            <tr>
              <td
                colSpan="3"
                className="text-center hover-add fw-bold"
                onClick={handleAddMoreLine}
                style={{
                  cursor: "pointer"
                }}
              >
                ADD MORE ROW
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecificationTable;
