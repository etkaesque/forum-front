import { useForm } from '@mantine/form';
import axios from 'axios';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useStore } from '@/store/state/store';

type Credentials ={
    email: string,
    password: string,
}

export default function LoginForm() {
    const setModal = useStore((state) => state.setModal)
    const setAuthentication = useStore((state) => state.setAuthentication)
    const [serverResponse, setServerResponse] = useState("")
    const mutation = useMutation({
    mutationFn: fetchUser,
    onError: (error : any) => {
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

    async function fetchUser(data : Credentials) {
    const response = await axios.post(
        `${process.env.SERVER_URL}/login`,
        {
          email: data.email,
          password: data.password
        }
      );
    
    return response.data
    }

    const handleSubmit = (values : Credentials) => {
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
      </form>
    </Box>
  );
}