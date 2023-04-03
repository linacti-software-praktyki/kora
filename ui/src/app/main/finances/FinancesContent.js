import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function FinancesTable({ itemData }) {
  const finances = itemData.finances.map((item) => {
    return item;
  });

  const [isEdit, setIsEdit] = useState(null);

  return (
    <table className="w-full">
      <tbody>
        <tr>
          {Object.keys(finances[0]).map((item) => {
            const fixedItem = item.replace(/_/g, ' ');
            if (item === 'id') return null;
            return <th className="capitalize p-8">{fixedItem}</th>;
          })}
          <th className="p-8">Actions</th>
        </tr>
        {finances.map((item) => {
          if (item.id === isEdit) return <FinanceRow setIsEdit={setIsEdit} editted item={item} />;
          return <FinanceRow setIsEdit={setIsEdit} item={item} />;
        })}
      </tbody>
    </table>
  );
}

function FinanceRow({ item, isEdit, setIsEdit, editted }) {
  const dataTypes = {
    type: 'string',
    description: 'string',
    amount: 'number',
    cashflow_date: 'date',
  };

  const [inputs, setInputs] = useState({});
  const [isChecked, setIsChecked] = useState(item.type === 'INCOME');
  const checkbox = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') setIsChecked(checkbox.current.checked);
    name === 'type'
      ? setInputs((values) => ({ ...values, [name]: !isChecked ? 'INCOME' : 'EXPENSE' }))
      : setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  const handleDelete = (id) => {
    console.log(`deleted: ${id}`);
  };

  return (
    <tr>
      {Object.keys(item).map((key) => {
        if (!editted && key === 'type')
          return item[key] === 'INCOME' ? (
            <td className="text-center">🟩</td>
          ) : (
            <td className="text-center">🟥</td>
          );
        if (editted && key === 'type')
          return (
            <td className="text-center">
              <input
                onChange={handleInputChange}
                type="checkbox"
                ref={checkbox}
                name={key}
                checked={isChecked}
              />
            </td>
          );
        if (key === 'id') return null;
        if (!editted)
          return (
            <td className="py-12 px-8 w-1/3">
              <p>{item[key]}</p>
            </td>
          );
        return (
          <td className="w-1/3">
            <input
              name={key}
              onChange={handleInputChange}
              className="py-12 px-8 w-full"
              type={dataTypes[key]}
              placeholder={item[key]}
            />
          </td>
        );
      })}
      {editted ? (
        <td className="justify-center flex items-center gap-12 py-12 px-8">
          <button
            className="bg-amber-700 py-4 px-8 text-white font-bold w-68"
            onClick={() => setIsEdit(null)}
          >
            Cancel
          </button>
          <button
            className="bg-green py-4 px-8 text-white font-bold w-68"
            onClick={() => handleSubmit}
          >
            Confirm
          </button>
        </td>
      ) : (
        <td className="justify-center flex items-center gap-12 py-12 px-8">
          <button
            className="bg-blue py-4 px-8 text-white font-bold w-68"
            onClick={() => setIsEdit(item.id)}
          >
            Edit
          </button>
          <button
            className="bg-red py-4 px-8 text-white font-bold w-68"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}

function FinancesPersonTable({ item, index, setIsPEdit, editted }) {
  const [name, setName] = useState(item.name);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  const handleDelete = (id) => {
    console.log(`deleted: ${id}`);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div key={index} className="mt-24">
      <div className="border-t-4">
        {!editted ? (
          <div className="text-2xl py-12 px-8 font-bold float-left">{item.name}</div>
        ) : (
          <input
            name="name"
            className="py-12 px-8 text-2xl font-bold float-left"
            type="string"
            placeholder={item.name}
            onChange={handleInputChange}
          />
        )}
        <div className="float-right">
          {editted ? (
            <td className="justify-center flex items-center gap-12 py-12 px-8">
              <button
                className="bg-amber-700 py-4 px-8 text-white font-bold w-68"
                onClick={() => setIsPEdit(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green py-4 px-8 text-white font-bold w-68"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </td>
          ) : (
            <td className="justify-center flex items-center gap-12 py-12 px-8">
              <button
                className="bg-blue py-4 px-8 text-white font-bold w-68"
                onClick={() => setIsPEdit(index)}
              >
                Edit
              </button>
              <button
                className="bg-red py-4 px-8 text-white font-bold w-68"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </td>
          )}
        </div>
      </div>
      <table className="clear-both ml-12">
        <tbody>
          <tr className="text-left">
            <th>Summary:</th>
            <td>{item.summary}</td>
          </tr>
          <tr className="text-left">
            <th>Prediction:</th>
            <td colSpan={4}>{item.prediction}</td>
          </tr>
          <tr className="text-center mt-12">
            <td>
              <button className="bg-green py-4 px-8 text-white font-bold w-144">
                Add new finance
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <FinancesTable itemData={item} />
    </div>
  );
}

function FinancesContent() {
  const [isPEdit, setIsPEdit] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://kora.1kb.pl/api/v1/finances/report/');
        const resData = await response.json();
        setData(resData);
    };
    fetchData();
  }, []);

  return (
    <div className="w-2/3 absolute left-1/2 translate-x-[-50%]">
      <div className="mb-8">
        <button className="bg-green py-4 px-8 text-white font-bold">Add new person</button>
      </div>

      {data.map((item, index) => {
        if (index === isPEdit)
          return <FinancesPersonTable setIsPEdit={setIsPEdit} editted item={item} index={index} />;
        return <FinancesPersonTable setIsPEdit={setIsPEdit} item={item} index={index} />;
      })}
    </div>
  );
}

export default FinancesContent;
