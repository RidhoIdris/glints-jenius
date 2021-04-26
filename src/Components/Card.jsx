import React from 'react'

export default function Card({data,onEdit,onDelete}) {
    return (
        <div className="bg-white flex flex-col items-center justify-center relative text-center rounded px-4 py-4">
            <span className="bg-indigo-500 text-white rounded-full px-2 mt-2 text-xs absolute top-3 right-5" >{data.age}</span>
            <img onError={(e)=>{e.target.onerror = null; e.target.src="https://dea.uii.ac.id/assets/img/avatar.png"}}  className="w-16 h-16 rounded-full object-cover" src={data.photo} alt="avatar"/>
            <h1 className="text-xl mt-2 font-semibold" >{data.firstName + ' ' + data.lastName}</h1>
            <div className="flex items-center justify-center space-x-2 w-full mt-4">
                <button onClick={()=>{onEdit(data.id)}} className="w-full border border-indigo-500 py-1 rounded bg-indigo-500 text-white focus:outline-none hover:text-indigo-500 hover:bg-white" >Edit</button>
                <button onClick={()=>{onDelete(data.id)}} className="w-full border border-red-500 py-1 rounded bg-red-500 text-white focus:outline-none hover:text-red-500 hover:bg-white" >Delete</button>
            </div>
        </div>
    )
}
