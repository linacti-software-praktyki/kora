import { useEffect, useRef, useState } from 'react';

function FinancesTable({ itemData, setData, data }) {
  const finances = itemData.finances.map((item) => {
    return item;
  });
  const [isEdit, setIsEdit] = useState(null);

  if (finances.length === 0) return <p className="text-center py-24">No data</p>;

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
        {finances.map((item, index) => {
          if (item.id === isEdit)
            return (
              <FinanceRow
                setIsEdit={setIsEdit}
                index={index}
                data={data}
                slug={itemData.slug}
                setData={setData}
                editted
                item={item}
              />
            );
          return (
            <FinanceRow
              setIsEdit={setIsEdit}
              index={index}
              setData={setData}
              data={data}
              slug={itemData.slug}
              item={item}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function FinanceRow({ item, isEdit, index, setIsEdit, editted, setData, slug, data }) {
  const dataTypes = {
    type: 'string',
    description: 'string',
    amount: 'number',
    cashflow_date: 'date',
  };

  const [inputs, setInputs] = useState({
    type: item.type,
    description: item.description,
    amount: item.amount,
    cashflow_date: item.cashflow_date,
  });
  const [isChecked, setIsChecked] = useState(item.type === 'INCOME');
  const checkbox = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') setIsChecked(checkbox.current.checked);
    name === 'type'
      ? setInputs((values) => ({ ...values, [name]: !isChecked ? 'INCOME' : 'EXPENSE' }))
      : setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://kora.1kb.pl/api/v1/finances/operations/${slug}/${index + 1}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(inputs),
    }).then(setData(!data));
  };

  const handleDelete = async (id) => {
    await fetch(`https://kora.1kb.pl/api/v1/finances/operations/${slug}/${id + 1}/`, {
      method: 'DELETE',
    }).then(setData(!data));
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
              value={item[key]}
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
            onClick={() => handleDelete(index)}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}

function FinancesPersonTable({ item, index, setIsPEdit, editted, setData, data }) {
  const [name, setName] = useState(item.name);
  const handleSubmit = async () => {
    console.log(name);
    await fetch(`https://kora.1kb.pl/api/v1/finances/people/${item.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then(setData(!data));
  };

  const handleDelete = async (slug) => {
    await fetch(`https://kora.1kb.pl/api/v1/finances/people/${slug}`, {
      method: 'DELETE',
    }).then(setData(!data));
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
                onClick={() => handleSubmit()}
              >
                Confirm
              </button>
            </td>
          ) : (
            <td className="justify-center flex items-center gap-12 py-12 px-8">
              <button
                className="bg-blue py-4 px-8 text-white font-bold w-68"
                onClick={() => setIsPEdit(item.slug)}
              >
                Edit
              </button>
              <button
                className="bg-red py-4 px-8 text-white font-bold w-68"
                onClick={() => handleDelete(item.slug)}
              >
                Delete
              </button>
            </td>
          )}
        </div>
      </div>
      <table className="clear-both ml-12 mb-36">
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
      <FinancesTable itemData={item} data={data} setData={setData} />
    </div>
  );
}

function AddPersonTable({ setAddPerson, setData, data }) {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    await fetch(`https://kora.1kb.pl/api/v1/finances/people`, {
      method: 'POST ',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then(setData(!data));
  };

  return (
    <div className="mt-24">
      <div className="border-t-4">
        <input
          name="name"
          className="py-12 px-8 text-2xl font-bold float-left"
          type="string"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <div className="float-right">
          <div className="justify-center flex items-center gap-12 py-12 px-8">
            <button className="bg-green py-4 px-8 text-white font-bold w-68"
            onClick={() => handleAdd}
            >Confirm</button>
            <button
              className="bg-red py-4 px-8 text-white font-bold w-68"
              onClick={() => setAddPerson(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancesContent() {
  const [isPEdit, setIsPEdit] = useState(null);
  const [addPerson, setAddPerson] = useState(false);

  const [data, setData] = useState([]);
  const [changeData, setChangeData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://kora.1kb.pl/api/v1/finances/report/');
      const resData = await response.json();
      setData(resData);
    };
    fetchData();
  }, [changeData]);

  const NoData = <p className="text-center py-24">No data</p>;
  return (
    <div className="w-2/3 absolute left-1/2 translate-x-[-50%]">
      <div className="mb-8">
        <button
          className="bg-green py-4 px-8 text-white font-bold"
          onClick={() => setAddPerson(true)}
        >
          Add new person
        </button>
      </div>
      {data.length === 0 && NoData}
      {addPerson && (
        <AddPersonTable setAddPerson={setAddPerson} data={changeData} setData={setChangeData} />

      )}<br />
      {data.map((item, index) => {
        if (item.slug === isPEdit && !addPerson)
          return (
            <FinancesPersonTable
              setIsPEdit={setIsPEdit}
              editted
              item={item}
              setData={setChangeData}
              data={changeData}
              index={index}
            />
          );
        return (
          <FinancesPersonTable
            setIsPEdit={setIsPEdit}
            item={item}
            setData={setChangeData}
            data={changeData}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default FinancesContent;
