import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { FireBaseContext } from "../../Context/FireBase";
import {
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const ExportSfda = ({ data, filename, sheetname }) => {
  const { EventRefrence } = useContext(FireBaseContext);

  console.log(data, "data");

  const exportToExcel = () => {
    const extractData = [
      ...data?.map((item) => {
        // console.log(
        //   item.Team.map((info) => info),
        //   "texm"
        // );

        // const {dbID} = useParams()
        // const ref = doc(EventRefrence, "CYU8HXQLi03iT8nv3R1u");
        console.log(item.CurrentEventID, "CurrentEventID");
        const ref = doc(EventRefrence, item.CurrentEventID);
        const infoCollection = collection(ref, "Subscribers");
        const handler = getDocs(infoCollection).then((snapshot) => {
          console.log(
            snapshot.docs.map((ele) => ele.data()),
            "handler snap"
          );
          return snapshot.docs.map((ele) => ele.data());
        });

        console.log(handler, "handler");

        // getData(infoCollection,setSubscribers)

        // const ref =doc(EventRefrence,dbID)

        return {
          "Event Name": item.EventName,
          "Franchise Name": item.Franchise?.toString(),
          id: item.Id,
          City: item.City.map((city) => city.types).join(","),
          "Cost per Delegate": item.CostperDelegate,
          "Event Cost": item.EventCost?.toString(),
          PO: item.PO,
          P3: item.P3,
          "Start Date": item.StartDate,
          "End Date": item.StartDate,
          "Created At": item.StartDate,
          // Team: item.Team.map((info) => info),
        };
      }),
    ];

    // const extractData = data.map((item) => ({
    //   "Event Name": item.EventName,
    //   "Franchise Name": item.Franchise?.toString(),
    //   id: item.Id,
    //   City: item.City,
    //   "Cost per Delegate": item.CostperDelegate,
    //   "Event Cost": item.EventCost?.toString(),
    //   PO: item.PO,
    //   P3: item.P3,
    //   "Start Date": item.StartDate,
    //   "End Date": item.StartDate,
    //   "Created At": item.StartDate,
    //   Team: item.Team.map((info) => info),
    // }));

    // const ws = XLSX.utils.aoa_to_sheet(extractData);
    // const ws = XLSX.utils.json_to_sheet(extractData);
    const ws = XLSX.utils.json_to_sheet(extractData);
    const wb = XLSX.utils.book_new();
    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, sheetname);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <i className="fa-solid fa-download" onClick={exportToExcel}>
      <span className="fs-6 fw-light"> sfda</span>{" "}
    </i>
  );
};

export default ExportSfda;
