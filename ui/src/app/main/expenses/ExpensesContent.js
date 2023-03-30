import data from './MOCK_DATA.json';
import {useState} from "react";

function ExpensesTable({dataType}) {
    return (
        <table class="border-2 border-[#111827] color-[#111827] bg-white">
            <tbody>
            <tr class="border-b-2 border-[#111827]">
                {["#", ...dataType, ["Options"]].map((item, index) => {
                    const fixed = item[0].replace(/_/g, " ");
                    return <th class="uppercase p-16" key={index}>{fixed}</th>
                })
                }
            </tr>
            {data.map((row, rowIndex) => {
                return (
                    <tr key={rowIndex} class="hover:bg-black/5">
                        <td class="px-16 py-8 bg-[#111827] text-white">{rowIndex + 1}</td>
                        {Object.keys(row).map((key, index) => {
                            if (key === "summary") {
                                return (<td class="px-16 py-8">{row["income"] - row["expense"]}
                                </td>);
                            }
                            return (<td class="px-16 py-8">{row[key]}</td>);
                        })
                        }
                        <td class="flex items-center  my-8 gap-8 mr-4">
                            <button className="bg-white text-[#111827] border border-[#111827] p-8">Edit</button>
                            <button className="bg-white text-[#111827] border border-[#111827] p-8">Delete</button>
                        </td>

                    </tr>)
            })}
            </tbody>
        </table>
    )
}

    function ExpensesAdd({dataType}) {
        const inputWidth = 100 / dataType.length;
        return (
            <table className="border-2 border-[#111827] color-[#111827] bg-white">
                <tbody>
                <tr className="border-b-2 border-[#111827]">
                    {dataType.map((item, index) => {
                        if(item[1] === "hidden")
                            return null;
                        const fixed = item[0].replace(/_/g, " ");
                        return <th className="uppercase p-16" key={index}>{fixed}</th>
                    })
                    }
                </tr>
                <tr className="hover:bg-black/5">
                {dataType.map((input, inputIndex) => {
                    if(input[1] === "hidden")
                        return null;
                    return (
                        <td style={{width: inputWidth + "%"}}>
                            <input className="p-4 w-full"   placeholder={input[1]}/>
                        </td>
                            )

                })}
                </tr>
                </tbody>
            </table>
        )
    }

    function ExpensesContent() {
        const [mode, setMode] = useState("table");
        const dataType = [["expense_type", "number"], ["expense", "number"], ["income_type", "number"], ["income", "number"], ["people", "string"], ["summary", "hidden"], ["raport", "number"], ["prediction", "number"]];
        return (
            <div class="w-4/5 absolute left-1/2 translate-x-[-50%]">
                <div class="float-left border-l-2 border-black my-8 px-8 capitalize text-xl">
                    {mode}
                </div>
                <div class="float-right">
                    <button onClick={() => setMode("table")}
                            className="bg-[#111827] text-white p-8 text-xl">Table
                    </button>
                    <span class="bg-[#111827] text-white p-10  text-xl">
                    /
                </span>
                    <button onClick={() => setMode("add")}
                            className="bg-[#111827] text-white p-8  text-xl">Add
                    </button>
                </div>
                <div class="clear-both">
                    {mode === "table" ? <ExpensesTable dataType={dataType}/> : <ExpensesAdd dataType={dataType}/>}
                </div>
            </div>
        )
    }

    export default ExpensesContent;
