import { useForm, matchesField} from '@mantine/form';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { PasswordInput } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useStore } from '@/store/state/store';
import { createUser} from "../../store/plugins/api"

type Credentials ={
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function RegisterForm() {
    const setModal = useStore((state) => state.setModal)
    const setAuthentication = useStore((state) => state.setAuthentication)
    const setForm = useStore((state) => state.setForm)
    const [serverResponse, setServerResponse] = useState("")

    const mutation = useMutation({
    mutationFn: createUser,
    onError: (error : any) => {
      console.log(error)
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
        name: (value) => {
          let name = value.trim()
          if (name.length < 3) {
            return 'Name is too short'
          }

          if (name.length > 15) {
            return 'Name is too long'
          }

        },
        email: (value) => {
          if(!/^\S+@\S+$/.test(value)) {
           return 'Invalid email'
          }

          if (value.length < 3) {
            return 'Email is too short'
          }

          if (value.length > 40) {
            return 'Email is too long'
          }
 
        },
        password: (value) => {
          
          if (value.length < 6) {
            return 'Password is too short'
          }

          if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
            return 'Minimum eight characters, at least one letter and one number:'
          }
 
        },
        confirmPassword: matchesField('password', 'Passwords are not the same')
       
    },
  });

    const handleSubmit = (values : Credentials) => {
    mutation.mutate(values)}


    return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput label="Name" placeholder="Enter your name" {...form.getInputProps('name')} />
      <TextInput label="Email" placeholder="Enter your email" {...form.getInputProps('email')} />
      <PasswordInput
      mt="md"
      label="Password"
      placeholder="Enter your password"
      {...form.getInputProps('password')}
        />

    <PasswordInput
      mt="md"
      label="Confirm password"
      placeholder="Confirm your password"
      {...form.getInputProps('confirmPassword')}
        />

      <div className='text-red-600'>
        {serverResponse}
        </div> 

      <Group justify="center" mt="xl">
        <Button
          type='submit'
          variant="outline">
            Register
        </Button>
      </Group>

      <button onClick={() => setForm('login')} className='w-full flex justify-center'>
        <span className='text-xs mt-2  text-indigo-700'>Already an user? Login here.</span>
      </button>

      </form>
    </Box>
  );
}