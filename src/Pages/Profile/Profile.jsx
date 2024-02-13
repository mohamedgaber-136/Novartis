import { Form, Formik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import ProfileReport from "../../Components/ProfileReport/ProfileReport";
import {  useState } from 'react';
import TextField from '@mui/material/TextField';
export const Profile = () => {
  const [disabledValue,setDisabled]=useState(true)
  const InputsDataColOne = [
    {
      label: "Name",
      defaultValue: "mohamed",
      type: "text",
    },
    {
      label: "Telephone",
      defaultValue: "+212345678",
      type: "text",
    },
  ];
  const InputsDataColTwo = [
    {
      label: "UserName",
      defaultValue: "Mohamed Ahmed Gaber",
      type: "text",
    },
    {
      label: "Password",
      defaultValue: "1234564",
      type: "password",
    },
  ];
const handleSubmit = (e)=>{
  e.preventDefault()
}
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
