import { Button } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useStore } from '@/store/state/store';

export default function LoginButton() {
  const setModal = useStore((state) => state.setModal)
  const handleClick = () => {
    setModal()
  }

  return (
   <Button
        onClick={handleClick}
        variant="filled"
        rightSection={<IconArrowRight size={14} />}
        >
          <Avatar variant="transparent" radius="sm" color="rgba(255, 255, 255, 1)" src="" />
        Login
    </Button>

    
  );
}
