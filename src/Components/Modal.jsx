import React from 'react'

export default function Modal({isOpen,onClose,children}) {

    return (
        <div className={`${isOpen ? 'fixed' : 'hidden'} z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen">
                <div onClick={()=>onClose()} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <div className="bg-white rounded-lg p-4 shadow-xl relative z-10 max-w-screen-md w-full">
                    {children}
                </div>


            </div>
        </div>
    )
}
