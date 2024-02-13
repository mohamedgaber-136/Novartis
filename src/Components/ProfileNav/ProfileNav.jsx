import {useNavigate} from 'react-router-dom'
import AlertBadge from '../AlertBage/AlertBadge'
import { useContext } from 'react'
import { FireBaseContext } from '../../Context/FireBase'
import { BinBadge } from '../binBadge/BinBadge'
export const ProfileNav = () => {
  const navigate = useNavigate()
  const {auth} = useContext(FireBaseContext)
  const signOut = ()=>{
    auth.signOut() 
  localStorage.removeItem('myState')  
  navigate('/')
  }
  return (
<div className=' d-flex justify-content-between flex-column container align-items-end gap-2'>
    <div className='d-flex ProfileNavParen justify-content-end  container align-items-center  gap-3'>
    <AlertBadge/>
    <BinBadge/>
        <button onClick={signOut} className='rounded-pill btn-DarkBlue btn px-3 py-2 d-flex align-items-center gap-2 AddEventBtn text-white'>
      log out
    </button>
    </div>
    <button onClick={()=>navigate('AddEvents')}  className='rounded-pill btn-DarkBlue btn px-3 py-2 d-flex align-items-center gap-2 AddEventBtn'>
        <span className="text-white">Add Event</span><i className="fa-light fa-plus text-white"></i>
        </button>
</div>  )
}
