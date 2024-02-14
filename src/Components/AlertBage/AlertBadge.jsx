import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FireBaseContext } from "../../Context/FireBase";
// import UseMenu from '../testing-zolfa'
// import Notification from '../Notification/Notification'
import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import SnackBarItem from "../SnackBarItem/SnackBarItem";

export default function AlertBadge() {
  const navigation = useNavigate();
  const { triggerNum, setTriggerNum, database } = useContext(FireBaseContext);
  const [snackBarConfig, setSanckBarConfig] = useState({
    open: false,
    message: "",
  });

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  // const {database} = useContext(FireBaseContext)
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Set up real-time listener for changes in the 'notifications' collection
    const unsubscribe = onSnapshot(
      collection(database, "notifications"),
      (snapshot) => {
        const newNotifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // sort notify
        setTriggerNum(
          newNotifications.filter(({ isRead }) => isRead == false).length
        );
        console.log(
          newNotifications.filter(({ isRead }) => isRead == false),
          " new notify filter"
        );

        setNotifications([
          ...newNotifications
            // .filter((item) => item.isRead == false)
            .sort((x, y) => {
              if (
                new Date(x.CreatedAt).getTime() <
                new Date(y.CreatedAt).getTime()
              ) {
                return 1;
              }
              if (
                new Date(x.CreatedAt).getTime() >
                new Date(y.CreatedAt).getTime()
              ) {
                return -1;
              }
              return 0;

              // return a.EventID - b.EventID
            }),
        ]);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // TODO: undefiened error
  // useEffect(() => {
  //   if(triggerNum!==0)
  //   {
  //     //TODO: Add notification details
  //     setSanckBarConfig({ open: true, message: 'New Notification'});
  //   }
  // }, [triggerNum]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log(notifications, "notifications list");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (EventID, NewEventID, notifyID) => {
    setAnchorEl(null);
    await updateDoc(doc(database, "notifications", notifyID), { isRead: true });
    navigation(`/app/subscribers/${EventID}/${NewEventID}`);
  };
  return (
    <>
      <IconButton
        onClick={(e) => {
          // setTriggerNum(0);
          // update to firebase
          // setNotifications([
          //   ...notifications.map((item) => ({ ...item, isRead: true })),
          // ]);
          handleClick(e);
        }}
        aria-label={notificationsLabel(triggerNum)}
      >
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          badgeContent={triggerNum}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <SnackBarItem
        snackBarConfig={snackBarConfig}
        setSanckBarConfig={setSanckBarConfig}
      />

      {/* <UseMenu/> */}
      {/* <div> */}
      {/* <Button onClick={handleClick} variant="contained">
      Open Menu
    </Button> */}
      {notifications.length !== 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {notifications.slice(0, 5).map((notify) => (
            <div>
              {/* on click navigate to page */}
              {/* <MenuItem onClick={handleClose} key={notify.id}> */}
              <MenuItem
                onClick={() =>
                  handleClose(notify.EventID, notify.NewEventID, notify.id)
                }
                key={notify.id}
                className={`mx-2 rounded ${!notify.isRead && "bg-light"}`}
              >
                <div>
                  <div className="py-2 fw-bolder">{`New Event Created '${notify.EventName}'`}</div>
                  <div className="px-2">{`By: ${notify.CreatedBy}`}</div>
                  <div className="px-2 fs-6">{`At: ${notify.CreatedAt}`}</div>
                  {/* <div>{notify.TimeStamp}</div> */}
                </div>
              </MenuItem>
              <Divider variant="middle" component="li" />
            </div>
          ))}
          {/* <MenuItem onClick={handleClose}>Option 1</MenuItem> */}
          {/* <MenuItem onClick={handleClose}>Option 2</MenuItem> */}
          {/* <MenuItem onClick={handleClose}>Option 3</MenuItem> */}
        </Menu>
      )}
      {/* </div> */}

      {/* <Notification/> */}
    </>
  );
}
