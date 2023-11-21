import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useStore } from '@/store/state/store';
import { loginUser } from '@/store/plugins/api';
import { LoginCredentials } from '@/types';

export default function LoginForm() {
    const setModal = useStore((state) => state.setModal)
    const setNotification = useStore((state) => state.setNotification)
    const setAuthentication = useStore((state) => state.setAuthentication)
    const setForm = useStore((state) => state.setForm)
    const [serverResponse, setServerResponse] = useState("")
    const mutation = useMutation({
    mutationFn: loginUser,
    onError: (error : any) => {
      if(error.code === "ERR_NETWORK") {
        setNotification({success:false, display:true, message: "Could not connect to a server. Try again later"})
        return
      }
      setServerResponse(error.response.data.message)
      setAuthentication(false)},
    onSuccess(data) {
      
      localStorage.setItem("jwt_token", data.jwt_token);
      localStorage.setItem(
        "jwt_refresh_token",
        data.jwt_refresh_token
      );
      setAuthentication(true)
      setModal()

    },
  })
    const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
        email: (value) => {
          if(!/^\S+@\S+$/.test(value)) {
           return 'Invalid email'
          }

          if (value.length < 3) {
            return 'Email is too short'
          }
 
        },
        password: (value) => {
          
          if (value.length < 6) {
            return 'Password is too short'
          }
 
        },
    },
  });

    const handleSubmit = (values : LoginCredentials) => {
    mutation.mutate(values)
  }

    return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput label="Email" placeholder="Enter your email" {...form.getInputProps('email')} />
      <PasswordInput
      mt="md"
      label="Password"
      placeholder="Enter your password"
      {...form.getInputProps('password')}
        />

      <div className='text-red-600'>
        {serverResponse}
        </div> 

      <Group justify="center" mt="xl">
        <Button
          type='submit'
          variant="outline">
            Login
        </Button>
      </Group>

      <button onClick={() => setForm('register')} className='w-full flex justify-center'>
        <span className='text-xs mt-2 text-indigo-700'>Are you a new user? Register here.</span>
      </button>
      </form>
    </Box>
  );
}