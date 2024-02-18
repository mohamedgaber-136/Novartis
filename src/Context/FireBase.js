import { initializeApp } from "@firebase/app";
import { createContext, useEffect, useState } from "react";

import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const FireBaseContext = createContext();
const FireBaseContextProvider = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [IdIncluded, setId] = useState(false);
  const [userId, SetuserId] = useState("");
  const [rows, setRows] = useState([]);
  const [triggerNum, setTriggerNum] = useState(0);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filterdData, setFilterd] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);
  const [Subscribers, setSubscribers] = useState([]);
  const [roleCondition, setRole] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [eventsQueryRole, setEventsQueryRole] = useState(null);
  const [newEvent, setNewEvent] = useState({
    EventName: "",
    CostperDelegate: "",
    PO: "",
    Franchise: "",
    Id: "",
    City: [],
    P3: "",
    TransferOfValue: [],
    CreatedAt: new Date().toLocaleString(),
    StartDate: "",
    EndDate: "",
    DateFromHours: "",
    DateEndHours: "",
    BackGroundColor: "#FFF",
    FontColor: "#000",
    ButtonColor: "#00F",
    AccpetAllTermss: false,
  });
  const firebaseConfig = {
    apiKey: "AIzaSyBckxAp9_24tLxViaY6yX5BUln07nUk2sM",
    authDomain: "novartis-f3745.firebaseapp.com",
    projectId: "novartis-f3745",
    storageBucket: "novartis-f3745.appspot.com",
    messagingSenderId: "904353795718",
    appId: "1:904353795718:web:25f35b4c6c5f25688f8b07",
    measurementId: "G-2LMZXPR3L4",
  };
  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);
  const EventRefrence = collection(database, "Event");
  const TeamsRefrence = collection(database, "Teams");
  const SubscribersRefrence = collection(database, "Subscribers");
  const deletedRef = collection(database, "Deleted");
  const UserRef = collection(database, "Users");
  const EventsDeletedRef = collection(database, "EventsDeleted");
  const SubscribersDeletedRef = collection(database, "SubscribersDeleted");
  //  Authentication
  const auth = getAuth(app);
  // GetData from FireBase
  const getData = (CollectionType, SetItem) => {
    const returnedValue = onSnapshot(CollectionType, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ID: doc.id,
        ...doc.data(),
      }));
      SetItem(newData);
    });
  };
  const [currentUsr, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const eventsQueryAccordingToUserRole = (userRole, userID) => {
    console.log(userID, "userID");
    console.log(userRole, "userRole");
    console.log(userRole.toLowerCase().includes("admin"), "userRole");
    console.log(userRole.toLowerCase().includes("admin manager"), "userRole");
    console.log(userRole.toLowerCase().includes("franchise"), "userRole");
    switch (true) {
      case userRole.toLowerCase().includes("admin"): {
        console.log("currentUserRole admin case");
        setEventsQueryRole(query(EventRefrence));
        break;
      }
      case userRole.toLowerCase().includes("brand manager"): {
        console.log("currentUserRole brand manager case");
        setEventsQueryRole(
          query(EventRefrence, where("CreatedByID", "==", userID))
        );
        break;
      }
      case userRole.toLowerCase().includes("franchise"): {
        console.log("currentUserRole franchise manager case");
        const franchiseType = userRole.split("-")[1];
        console.log(franchiseType, "franchise manager case");
        setEventsQueryRole(
          query(EventRefrence, where("Franchise", "==", Number(franchiseType)))
        );
        break;
      }
    }
  };

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false);
      if (user) {
        setCurrentUser(user.uid);
        const users = doc(UserRef, user.uid);
        const finaleUser = await getDoc(users);
        setCurrentUserRole(finaleUser.data().Role);

        eventsQueryAccordingToUserRole(finaleUser.data().Role, user.uid);

        localStorage.setItem("REF", JSON.stringify(finaleUser.data().Role));
      } else {
        setCurrentUser(null);
        setCurrentUserRole(null);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // useEffect(() => {
  //   eventsQueryAccordingToUserRole();
  // }, []);
  // useEffect(() => {
  //   console.log(eventsQueryRole, "events query context");
  // }, [eventsQueryRole]);

  // const setEventsListDataAccordingToUserRole = (dataList) => {
  //   switch (true) {
  //     case currentUserRole.toLowerCase().includes("admin"): {
  //       console.log("currentUserRole admin case");
  //       return dataList;
  //       // setEventsAccordingToRole([...data]);
  //       // break;
  //     }
  //     case currentUserRole.toLowerCase().includes("brand manager"): {
  //       console.log("currentUserRole brand manager case");
  //       return dataList.filter(({ CreatedByID }) => CreatedByID == currentUsr);
  //       // setEventsAccordingToRole([
  //       //   ...data.filter(({ CreatedByID }) => CreatedByID == currentUsr),
  //       // ]);
  //       // break;
  //     }
  //     case currentUserRole.toLowerCase().includes("franchise"): {
  //       console.log("currentUserRole franchise manager case");
  //       const franchiseType = currentUserRole.split("-")[1];
  //       console.log(franchiseType, "franchise manager case");
  //       return dataList.filter(({ Franchise }) => Franchise == franchiseType);
  //       // setEventsAccordingToRole([
  //       //   ...data.filter(({ Franchise }) => Franchise == franchiseType),
  //       // ]);
  //       // break;
  //     }
  //   }
  // };

  return (
    <FireBaseContext.Provider
      value={{
        SetuserId,
        roleCondition,
        setRole,
        setCurrentUser,
        IdIncluded,
        setId,
        SubscribersDeletedRef,
        EventsDeletedRef,
        currentUsr,
        auth,
        app,
        updateUser,
        setUpdateUser,
        filterdData,
        setFilterd,
        rows,
        setRows,
        setImgUrl,
        triggerNum,
        setTriggerNum,
        getData,
        Subscribers,
        SubscribersRefrence,
        database,
        setAuthorized,
        authorized,
        events,
        teams,
        newEvent,
        setNewEvent,
        EventRefrence,
        setEvents,
        setSubscribers,
        setTeams,
        TeamsRefrence,
        currentUserRole,
        setCurrentUserRole,
        // setEventsListDataAccordingToUserRole,
        UserRef,
        
        // eventsQueryAccordingToUserRole,
        eventsQueryRole,
        // setEventsListDataAccordingToUserRole,
      }}
    >
      {!loading && children}
    </FireBaseContext.Provider>
  );
};
export default FireBaseContextProvider;
