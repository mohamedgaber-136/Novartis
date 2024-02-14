import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import "./Event.css";
import { FireBaseContext } from "../../Context/FireBase";
import { collection, getDocs, doc ,onSnapshot, getDoc} from "firebase/firestore";
export const Events = () => {
  const { events, getData, setEvents, EventRefrence} = useContext(
    FireBaseContext
  );
  const [informations, setInformations] = useState([]);
  const [sub,setSub]=useState([])
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    getData(EventRefrence, setInformations);
      const fetchData = async () => { 
        const eventObj = await getDocs(EventRefrence)
          const EventDetails = eventObj.docs.map(async(maidDoc)=>{
          const mainDocData = { id: maidDoc.id, ...maidDoc.data() }    
          const ref =doc(EventRefrence,maidDoc.id)
          const infoCollection = collection(ref,'Subscribers') 
          const subObj = await getDocs(infoCollection) 
          const subData = subObj.docs.map((subDoc) => ({ id: subDoc.id, ...subDoc.data() }));     
          mainDocData['Team'] = subData;   
          return mainDocData;      
        }
        
        )
        setCombinedData(eventObj);
          // console.log(datas)
        };
          fetchData();
    }, []);
    
    useEffect(()=>{
       let x = combinedData.docs?.map((item)=> item.data())
       setSub(x)
    },[combinedData])
    console.log(sub, 'combined')
    
          // Fetch data from the main collection
          // const mainCollectionSnapshot = await collection(database,'Event').get();
          // const getDatas = (EventRefrence) => {
          //   const returnedValue = onSnapshot(EventRefrence, (snapshot) => {
          //     const newData = snapshot.docs.map((doc) => (
          //       {
          //       ID: doc.id,
          //       ...doc.data(),
          //     }             
              
          //     ) )}
              
              
          //     )}
          //     const infoCollection = collection(subCollectionSnapshot,'Subscribers')
          //     // console.log(subCollectionSnapshot)
          //     //   const returnedValue = onSnapshot(infoCollection, (snapshot) => {
          //     //     const newData = snapshot.docs.map((doc) => ({
          //     //       ID: doc.id,
          //     //       ...doc.data(),
          //     //     }));                 
          //     //   });
              
          //     //     .collection('Event')
          //     //     .doc(doc.id)
          //     //     .collection('Subscribers')
          //     //     .get();
          //   });
          // };
          // const mainData = mainCollectionSnapshot.docs.map((mainDoc) => {
          //   const mainDocData = { id: mainDoc.id, ...mainDoc.data() };
  
          //   // Fetch data from the subcollection
          //   const subCollectionSnapshot =  database
          //     .collection('Event')
          //     .doc(mainDoc.id)
          //     .collection('Subscribers')
          //     .get();
  
          //   const subData = subCollectionSnapshot.docs.map((subDoc) => ({ id: subDoc.id, ...subDoc.data() }));
  
          //   // Add subcollection data to the main document
          //   mainDocData.subCollectionData = subData;
  
          //   return mainDocData;
          // });
  
          // // Update state with the combined data
     
  

  useEffect(() => {
    if (informations.length) {
      // هنا عملنا تغيير من غير ReRender
      const date = new Date().getTime()
      const fetchDataForItems = async () => {
     const promises=  informations.map( 
        async (item) => {
        const data = doc(EventRefrence, item.ID);
        const eventSubscribersCollec = collection(data, "Subscribers");
        const subNm = await getDocs(eventSubscribersCollec);
        const NumberOfSubScribers = subNm.docs.length;
        const cost = item.CostperDelegate
      const EndTime = new Date(item.EndDate).getTime()
      const StartTime = new Date(item.StartDate).getTime()
      if(StartTime>date){
        item.Status ='Pending'
      }else if(date>StartTime&&EndTime>date){
        item.Status ='Started'
      }else if (date>EndTime){
        item.Status = 'Completed'
      }
       item.EventCost = NumberOfSubScribers * item.CostperDelegate;
       return item;
      }
      )
      const results = await Promise.all(promises);
      setEvents(results);
    }
    fetchDataForItems()
    }
  }, [informations]);
  return (
    <div className="d-flex flex-column container gap-3 EventsPageParent ">
      <h2>Events</h2>
      <DataTable row={events} sub={sub} />
    </div>
  );
};