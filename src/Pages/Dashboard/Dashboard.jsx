import { useContext, useEffect, useState } from "react";
import BasicTable from "../../Components/BasicTable/BasicTable";
import { WeekEeventsCard } from "../../Components/WeekEventsCard/WeekEeventsCard";
import "./Dashboard.css";
import { FireBaseContext } from "../../Context/FireBase";
import { query } from "firebase/firestore";

export const Dashboard = () => {
const [WeeksInfo,setWeeksInfo]=useState([
  {
    times: day,
    calen: "Today",
    color: "#FFc100",
  },
  {
    times: "10 ",
    calen: "Week",
    color: "#F1606B",
  },
  {
    times: "10 ",
    calen: "Month",
    color: "#0460a9",
  },
])
const [day,setDays]=useState(0)
const [Weeks,setWeeks]=useState(0)
const [Months,setMonths]=useState(0)
  const { getData, EventRefrence, eventsQueryRole } = useContext(
    FireBaseContext
  );
  const [data, setData] = useState([]);
  const [eventsAccordingToRole, setEventsAccordingToRole] = useState([]);

  useEffect(() => {
    // if (eventsQueryRole) {
    //   getData(eventsQueryRole, setData);
    // }
    getData(EventRefrence, setData);
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setEventsAccordingToRole(data);
      // setEventsAccordingToRole([...setEventsListDataAccordingToUserRole(data)]);
    }
  }, [data]);
console.log(day)
  return (
    <div className="d-flex flex-column gap-4 align-items-start ">
      {/* <Notification/> */}
      <div className="container">
        <h2 className="my-3">Hi , {(JSON.parse(localStorage.getItem('User'))).Name}</h2>
        <div className="d-flex  justify-content-between align-item-center w-100">
          <div className="   d-flex flex-column gap-2  align-items-start DashboardTableParen w-100">
            <div className="d-flex align-items-center justify-content-start gap-2 w-100  ">
              {WeeksInfo.map((item, ind) => (
                <WeekEeventsCard
                  key={ind}
                  num={data.length}
                  calen={item.calen}
                  info={item.times}
                  color={item.color}
                />
              ))}
            </div>
            <div className="w-100">
              <h2 className="mt-3 text-secondary">Events</h2>
              <BasicTable row={eventsAccordingToRole} setDays={setDays} setWeeks={setWeeks} setMonths={setMonths} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
