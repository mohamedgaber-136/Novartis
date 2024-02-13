import React, { useContext, useEffect, useState } from 'react'
import TeamsTable from '../../Components/TeamsTable/TeamsTable'
import { FireBaseContext } from '../../Context/FireBase'
import { collection, getDocs,query,onSnapshot } from 'firebase/firestore'

export const Teams = () => {
const {teams,setTeams,TeamsRefrence} = useContext(FireBaseContext)
const [franchiseTen,setfranchiseTen] = useState([])
const [franchiseThirty,setfranchiseThirty] = useState([])
const subCollectionQueryTen = query(
  collection(TeamsRefrence,'10', 'Events')
);
const subCollectionQueryThirty = query(
  collection(TeamsRefrence,'30', 'Events')
);
const getItem = ( collection,setItem)=>{
  const returnedValue = onSnapshot(collection, (snapshot) => {
    const newData = snapshot.docs
    console.log(newData,'new')
    if(collection==subCollectionQueryTen){
      setItem({length:newData.length,name:'Ten'})
    }else if(collection==subCollectionQueryThirty){      
      setItem({length:newData.length,name:'Thirty'})
    }
  })
}

useEffect(()=>{
    getItem(subCollectionQueryTen,setfranchiseTen)
    getItem(subCollectionQueryThirty,setfranchiseThirty)
  
},[])
useEffect(()=>{
  setTeams([franchiseTen,franchiseThirty])
},[
  franchiseTen,franchiseThirty
])
  return (
    <div className='d-flex flex-column container gap-3 EventsPageParent '>
      <h2>Teams</h2>
      <TeamsTable  row={teams} />
      </div>
  )
}
