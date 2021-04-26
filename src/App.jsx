import { useEffect, useState } from "react";
import Button from "./Components/Button";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {retrieveContacts,createContact, updateContact,deleteContact} from './Actions/contact'
import Card from "./Components/Card";
import ContactDataService from './Services/contact.service'
import Modal from "./Components/Modal";
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


const defaultForm = {
    id: '',
    age: '',
    firstName: '',
    lastName: '',
    photo: '',
}

function App() {
  const contact = useSelector(state => state.contact);
  const dispatch = useDispatch();

  const [currentContact, setCurrentContact] = useState(defaultForm)
  const [isOpen, setIsOpen] = useState(null)

  useEffect(() => {
    dispatch(retrieveContacts())
  },[dispatch])

  const handleEdit = (id) => {
    ContactDataService.get(id)
      .then((response) => {
        setCurrentContact(response.data.data);
        setIsOpen(true)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleDelete = (id) => {
    dispatch(deleteContact(id)).then((e)=>{
      // console.log(e.response.data)
      Toast.fire({
        icon: 'success',
        title: 'Contact has ben deleted !'
      })
    }).catch((e) => {
      // console.log(e.response);
      Toast.fire({
        icon: 'error',
        title: 'Oops...Something went wrong!'
      })
    })
  }

  const handleChange = (e) => {
    setCurrentContact({
      ...currentContact,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = () => {
    let tempData = {...currentContact}
    delete tempData.id
    if (currentContact.id === '') {
      tempData.photo = tempData.photo === '' ? 'N/A' : tempData.photo
      dispatch(createContact({...tempData})).then(()=>{
        dispatch(retrieveContacts()).then(()=>{
          setIsOpen(false)
          Toast.fire({
            icon: 'success',
            title: 'Contact has ben submited !'
          })
        })
      }).catch((e) => {
        Toast.fire({
          icon: 'error',
          title: e.response.data.message
        })
        // console.log(e.response.data.message);
      })
    }else{
      dispatch(updateContact(currentContact.id,tempData)).then(()=>{
        setIsOpen(false)
        Toast.fire({
          icon: 'success',
          title: 'Contact has ben updated !'
        })
      }).catch((e) => {
        Toast.fire({
          icon: 'error',
          title: e.response.data.message
        })
        // console.log(e.response.data.message);
      })
    }
  }




  return (
    <div className="bg-main">
      <div className="container px-4 2xl:px-8 z-10 sticky top-0 bg-white mx-auto flex items-center justify-between py-6">
        <div className="flex items-center space-x-2">
          <img src="https://ridho.tech/static/media/avatar.5fd88976.svg" alt="my logo" className="w-10 h-10" />
         <h1 className="text-3xl font-semibold" >Ridho Idris</h1>
        </div>
        <a href="https://ridho.tech/" target="_BLANK" rel="noreferrer" className="focus:outline-none`"><Button>Say Hello</Button></a>
      </div>
      <div className="min-h-screen max-w-screen-lg mx-auto py-8">
       <button onClick={()=>{setIsOpen(true);setCurrentContact(defaultForm)}} className="flex items-center bg-indigo-500 hover:bg-white hover:text-indigo-500 border border-indigo-500 ml-auto text-white py-2 px-6 rounded focus:outline-none" >
         <FiPlus/>
       </button>
       <div className="grid grid-cols-4 gap-5 mt-5">
           {contact.map((e,i)=>{
             return(
               <Card key={i} data={e} onEdit={(e)=>{handleEdit(e)}} onDelete={(e)=>{handleDelete(e)}}  />
             )
           })}
       </div>
      </div>
      <Modal isOpen={isOpen} onClose={()=>{setIsOpen(false)}}>
          <h1 className="text-xl" >Input Contact</h1>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm text-gray-500">First Name</label>
              <input onChange={(e)=>{handleChange(e)}} className="rounded bg-main w-full px-4 py-2 focus:outline-none" type="text" id="firstName" name="firstName" value={currentContact.firstName} placeholder="First Name" />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm text-gray-500">First Name</label>
              <input onChange={(e)=>{handleChange(e)}} className="rounded bg-main w-full px-4 py-2 focus:outline-none" type="text" id="lastName" name="lastName" value={currentContact.lastName} placeholder="Last Name" />
            </div>
            <div>
              <label htmlFor="age" className="text-sm text-gray-500">Age</label>
              <input onChange={(e)=>{handleChange(e)}} className="rounded bg-main w-full px-4 py-2 focus:outline-none" type="text" id="age" name="age" value={currentContact.age} placeholder="Age" />
            </div>
            <div>
              <label htmlFor="photo" className="text-sm text-gray-500">Url Photo</label>
              <input onChange={(e)=>{handleChange(e)}} className="rounded bg-main w-full px-4 py-2 focus:outline-none" type="text" id="photo" name="photo" value={currentContact.photo} placeholder="Url Photo" />
            </div>
          </div>
          <div className="mt-4 flex space-x-4 items-center justify-end">
            <button onClick={()=>{setIsOpen(false)}} className="flex items-center bg-gray-500 hover:bg-white hover:text-gray-500 border border-gray-500 ml-auto text-white py-2 px-6 rounded focus:outline-none">Cancel</button>
            <button onClick={()=>{handleSubmit()}} className="flex items-center bg-indigo-500 hover:bg-white hover:text-indigo-500 border border-indigo-500 ml-auto text-white py-2 px-6 rounded focus:outline-none">Submit</button>
          </div>
      </Modal>
    </div>
  );
}

export default App;
