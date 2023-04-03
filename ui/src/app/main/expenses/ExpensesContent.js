import { useState } from 'react';
import dataJson from './MOCK_DATA.json';

function ExpensesTable({ dataType, data, setData, setMode }) {
  const inputWidth = 100 / (dataType.length + 1);
  return (
    <table className="border-2 border-[#111827] color-[#111827] bg-white">
      <tbody>
        <tr className="border-b-2 border-[#111827]">
          {['#', ...dataType, ['Options']].map((item, index) => {
            const fixed = item[0].replace(/_/g, ' ');
            if (item === '#')
              return (
                <th className="uppercase p-16" key={index} style={{ width: `2%` }}>
                  {fixed}
                </th>
              );
            return (
              <th className="uppercase p-16" key={index} style={{ width: `${inputWidth}%` }}>
                {fixed}
              </th>
            );
          })}
        </tr>
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} className="hover:bg-black/5">
              <td className="px-16 py-8 bg-[#111827] text-white">{rowIndex + 1}</td>
              {Object.keys(row).map((key, index) => {
                return <td key={index} className="px-16 py-8">{row[key]}</td>;
              })}
              <td className="flex items-center justify-center my-8 gap-8 mr-4">
                <button
                  className="bg-white text-[#111827] border border-[#111827] p-8"
                  onClick={() => {
                    const newData = [...data];
                    newData.splice(rowIndex, 1);
                    setData(newData);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ExpensesAdd({ dataType, data, setData }) {
  const [inputs, setInputs] = useState({});
  let shownData = 0;
  for (let i = 0; i < dataType.length; i++) {
    if (dataType[i][1] !== 'hidden') shownData++;
  }
    const inputWidth = 100 / (shownData + 1);

  function handleFromSubmit(event) {
      event.preventDefault();
      console.log(inputs);
  }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

  return (
    <form onSubmit={handleFromSubmit}>
      <table className="border-2 border-[#111827] color-[#111827] bg-white">
        <tbody>
          <tr className="border-b-2 border-[#111827]">
            {[...dataType, ['Options']].map((item, index) => {{
                if(item[1] === 'hidden') return null;
              const fixed = item[0].replace(/_/g, ' ');
              return (
                <th className="uppercase p-16" key={index}>
                  {fixed}
                </th>
              );
            }})}
          </tr>
          <tr className="hover:bg-black/5">
            {dataType.map((input, inputIndex) => {
                if(input[1] === 'hidden') return null;
              return (
                <td style={{ width: `${inputWidth}%` }} key={inputIndex}>
                  <input className="p-4 w-full" name={input[0]} placeholder={input[1]} type={input[1]} onChange={handleChange}/>
                </td>
              );
            })}
            <td className="flex items-center justify-center my-8 gap-8 mr-4">
              <button type="submit" className="bg-white text-[#111827] border border-[#111827] p-8">
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

function ExpensesContent() {
  const [mode, setMode] = useState('table');
  const dataType = [
    ['expense_type', 'number'],
    ['expense', 'number'],
    ['income_type', 'number'],
    ['income', 'number'],
    ['people', 'string'],
    ['summary', 'hidden'],
    ['raport', 'string'],
    ['prediction', 'hidden'],
  ];
  const [data, setData] = useState(dataJson);
  return (
    <div className="w-full absolute left-1/2 translate-x-[-50%]">
      <div className="float-left border-l-2 border-black my-8 px-8 capitalize text-xl">{mode}</div>
      <div className="float-right">
        <button onClick={() => setMode('table')} className="bg-[#111827] text-white p-8 text-xl">
          Table
        </button>
        <span className="bg-[#111827] text-white p-10  text-xl">/</span>
        <button onClick={() => setMode('add')} className="bg-[#111827] text-white p-8  text-xl">
          Add
        </button>
      </div>
      <div className="clear-both">
        {mode === 'table' ? (
          <ExpensesTable dataType={dataType} data={data} setData={setData} setMode={setMode}/>
        ) : (
          <ExpensesAdd dataType={dataType} data={data} setData={setData} />
        )}
      </div>
    </div>
  );
}

export default ExpensesContent;
