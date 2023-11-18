import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useStore } from '@/store/state/store';
import LoginForm from './forms/LoginForm';

export default function ModalComponent() {


  const modal = useStore((state) => state.modal)
  const setModal = useStore((state) => state.setModal)

  const handleModal = () => {
    setModal()
  }

  return (
    <>
      <Modal opened={modal} onClose={handleModal} yOffset="1vh" xOffset={0} centered>
        <LoginForm></LoginForm>
      </Modal>
    </>
  );
}