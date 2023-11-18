import { Loader } from '@mantine/core';

export default function AppLoader() {
  return( 

    <div className='fixed bottom-0 right-0 p-4'>
          <Loader size={50} />
    </div>

  );
}