import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext } from 'react';
import { FireBaseContext } from '../../Context/FireBase';

export default function AlertBadge() {
    const {triggerNum,setTriggerNum}=useContext(FireBaseContext)
    function notificationsLabel(count) {
        if (count === 0) {
          return 'no notifications';
        }
        if (count > 99) {
          return 'more than 99 notifications';
        }
        return `${count} notifications`;
      }
  return (
    <IconButton onClick={()=>setTriggerNum(0)} aria-label={notificationsLabel(triggerNum)}>
      <Badge   anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }} badgeContent={triggerNum} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}