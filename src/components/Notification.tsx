import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';
import {useStore} from "../store/state/store"

export default function NotificationComponent(props : {message: string, success: boolean}) {
  const setNotification = useStore((state) => state.setNotification)
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const { message, success} = props
  return (
    <>
      {success ?  <Notification onClick={()=>setNotification({display:false, success: false, message: ""})} icon={checkIcon} color="teal" title="All good!" mt="md" className='max-w-xs fixed top-0 right-0 p-4 z-40'  >
        {message}
      </Notification> : <Notification onClick={()=>setNotification({display:false, success: false, message: ""})} icon={xIcon} color="red" title="Bummer!" className='max-w-xs fixed top-10 right-10 p-4 z-40'>
        {message}
      </Notification>} 
     
    </>
  );
}