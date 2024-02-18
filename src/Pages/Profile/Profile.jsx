import { Form, Formik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import ProfileReport from "../../Components/ProfileReport/ProfileReport";
import {  useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FireBaseContext } from "../../Context/FireBase";
import { doc, getDoc } from "firebase/firestore";
export const Profile = () => {
  const [disabledValue,setDisabled]=useState(true)
  const {currentUsr,UserRef} = useContext(FireBaseContext)
  const [Current,setCurrent] = useState(null) 
  const InputsDataColOne = [
    {
      label: "Name",
      defaultValue: Current?.Name,
      type: "text",
    },
    {
      label: "Telephone",
      defaultValue: Current?.PhoneNumber,
      type: "text",
    },
  ];
  const InputsDataColTwo = [
    {
      label: "Email",
      defaultValue:Current?.Email,
      type: "text",
    },
    // {
    //   label: "Password",
    //   defaultValue: Current?.Password,
    //   type: "password",
    // },
  ];
  console.log(currentUsr)
const handleSubmit = (e)=>{
  e.preventDefault()
}
useEffect(()=>{
const fetchUser = async () =>{
  const docRef = doc(UserRef,currentUsr)
  const user = await getDoc(docRef)
  setCurrent(user.data())
}

fetchUser()
},[currentUsr])
if(Current){
  return (
    <div className="  d-flex flex-column container gap-3 EventsPageParent">
      <h2>Profile</h2>
      <div className="px-5">
        <h2 className="mb-5 px-2">Personal Data</h2>
        <Formik>
          {() => (
            
            <Form
              onSubmit={handleSubmit}
              className="FormDataParent pt-5 bg-white container  rounded rounded-2 px-2 px-md-3 pt-3"
            >
            <div className="d-flex w-100 gap-5">

              <div className="d-flex gap-5 flex-column w-50  ">
                {InputsDataColOne.map((item, indx) => (
                  <TextField
                    key={indx}
                    name={item.label}
                    label={item.label}
                    focused
                    defaultValue={item.defaultValue}
                    disabled={disabledValue}
                  />
                ))}
              </div>
              <div className="d-flex gap-5 flex-column w-50 ">
                {InputsDataColTwo.map((item, indx) => (
                  <TextField
                    key={indx}
                    name={item.label}
                    label={item.label}
                    focused
                    defaultValue={item.defaultValue}
                    disabled={disabledValue}
                  />
                ))}
              </div>
              </div>


              <EditIcon
                title="edit"
                onClick={() => setDisabled(!disabledValue)}
                className="text-primary  EditPen"
              />
            <button
                className={`SaveBtn ${disabledValue && "d-none"} m-2 `}
                onClick={() => setDisabled(true)}
              >
                Save
           </button>
  
              <ProfileReport /> 
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
}
