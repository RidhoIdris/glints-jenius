import React from 'react'

export default function Button({children}) {
    return (
       <button className="border-2 focus:outline-none transition-all ease-in-out duration-500 rounded-full border-purple-500 text-purple-500 text-lg px-4 py-2 bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 font-semibold hover:text-white">{children}</button>
    )
}
