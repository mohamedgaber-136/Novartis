import React, { useContext, useEffect, useState } from 'react'
import TeamsTable from '../../Components/TeamsTable/TeamsTable'
import { FireBaseContext } from '../../Context/FireBase'
import { collection, getDocs,query,onSnapshot,doc,getDoc ,where} from 'firebase/firestore'
import { Navigate } from "react-router-dom";
export const Teams = () => {
const {setTeams,TeamsRefrence,currentUserRole,EventRefrence} = useContext(FireBaseContext)
const [collectionKeys, setCollectionKeys] = useState([]);
const  [teams,setTeam]=useState([
  {name:'Retina Franchise ',length:0},
  {name:'Medical Franchise',length:0},
])
useEffect(()=>{

const fetchDataRetina = async ()=> { 
//  const retinaRef =doc(TeamsRefrence,'RetinaFranchise')
//  const refCollec = await getDocs(retinaRef)
//  console.log(refCollec)
//  const collRetina = collection(retinaRef,'Events')
//  const retinaCollec = collection(retinaRef,'Events')
//  const data = await getDocs(retinaCollec)
//  console.log(data.docs)
// const ref = doc(TeamsRefrence, 'RetinaFranchise');
// const infoCollection = collection(ref, "Events");
// const subObj = await getDocs(infoCollection);
// const subData = subObj.docs.map((subDoc) => ({
//   id: subDoc.id,
//   ...subDoc.data(),
// }));
// console.log(subData)
const ref = await getDocs(query(EventRefrence,where('CostperDelegate',"==",'500')))
setCollectionKeys(ref)
}

fetchDataRetina()
},[])
console.log(collectionKeys)
// const [franchiseTen,setfranchiseTen] = useState([])
// const [franchiseThirty,setfranchiseThirty] = useState([])
// console.log(currentUserRole,'currentUserRole')

// const subCollectionQueryTen = query(
//   collection(TeamsRefrence,'10', 'Events')
// );
// const subCollectionQueryThirty = query(
//   collection(TeamsRefrence,'30', 'Events')
// );
// const getItem = ( collection,setItem)=>{
//   const returnedValue = onSnapshot(collection, (snapshot) => {
//     const newData = snapshot.docs
//     console.log(newData,'new')
//     if(collection==subCollectionQueryTen){
//       setItem({length:newData.length,name:'Ten'})
//     }else if(collection==subCollectionQueryThirty){      
//       setItem({length:newData.length,name:'Thirty'})
//     }
//   })
// }

// useEffect(()=>{
//     getItem(subCollectionQueryTen,setfranchiseTen)
//     getItem(subCollectionQueryThirty,setfranchiseThirty)
  
// },[])
// useEffect(()=>{
//   setTeams([franchiseTen,franchiseThirty])
// },[
//   franchiseTen,franchiseThirty
// ])
// useEffect(()=>{
//   const fetchItems = async ()=>{
//     const keys = [];
//     const docRef = await getDocs(TeamsRefrence)
//     console.log(docRef)
//     for (const topLevelDoc of docRef.docs) {
//   const nestedCollectionSnapshot = await topLevelDoc.ref.collection(topLevelDoc.id);
//   console.log(nestedCollectionSnapshot)
//   // Check if the nested collection has no documents
//   if (nestedCollectionSnapshot.empty) {
//     keys.push(topLevelDoc.id);
//   } 
//   console.log(topLevelDoc)

// }
//   setCollectionKeys(keys);
// }
// fetchItems()

// console.log(TeamsRefrence)
// },[])
    return (
      <div className='d-flex flex-column container gap-3 EventsPageParent '>
      <h2>Teams</h2>
      <TeamsTable  row={teams} />
      </div>
  )
}

