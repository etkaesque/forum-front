
import { TextInput  } from '@mantine/core';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Textarea } from '@mantine/core';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "@/store/state/store";
import { postQuestion } from "../../store/plugins/api"
import { useMutation } from '@tanstack/react-query';
import axios from "axios";

type post = {
  title: string,
  content: string
}

export default function Home() {
  const setLoader = useStore((state) => state.setLoader)
  
  const mutation = useMutation({
    mutationFn: postQuestion,
    onMutate: () => setLoader(true),
    onSettled: () => setLoader(false),
    onError: (error : any) => console.log("bad stuff", error),
    onSuccess: (data :any) => {
      const id = data.response.id
      router.push(`/question/${id}`)
    },
    
  })
  
  const router = useRouter()
  const maxInput = 35
  const maxContent = 1000

    const form = useForm({
      initialValues: {
        title: "",
        content: ""
      },
      validate: {
        title: (value) => {
          if(value.length > maxInput) {
            return 'Title is too long' 
          }
          if(value.length < 5) {
            return 'Title is too short' 
          }
        },
        content: (value) => {
          if(value.length > maxContent) {
            return 'Content is too long' 
          }
          if(value.length < 5) {
            return 'Content is too short' 
          }
        }
    },
    });

    const [verified, setVerified] = useState(false)
    const [token, setToken] = useState<string | null>(null);
    const authentication = useStore((state) => state.authentication)

    useEffect(() => {
      const token : string | null = localStorage.getItem("jwt_token")
      setToken(token)
    }, [authentication]);
    
    useEffect(() => {
      const verify = async () => {
        if(token) {
          try {
            await axios.post(`${process.env.SERVER_URL}/verifyToken`, {}, {headers: {
              authorization: token
            }})
            setVerified(true)
          } catch (error) {
            setVerified(false)
          }
        }
      } 
      verify()
    }, [token]);

  return (
    <div className="background">
      <main className="flex justify-center ">
        <section className=" myB p-5 relative max-w-7xl  w-3/4  mx-10">
          {verified ? (
          <>
          <h1 className="text-2xl mb-3 ">Post a question</h1>

            <form action="submit" onSubmit={form.onSubmit((form) => mutation.mutate(form))} className="flex flex-col gap-3">

                <TextInput   
                  {...form.getInputProps('title')}
                placeholder="Choose your title" 
                label="Title"
                name="title"      
                required
                maxLength={maxInput}
                withAsterisk  />
                           
                <Textarea
                  {...form.getInputProps('content')}
                 placeholder="Type what is on your mind"
                 label="Content"
                 name="content"
                 autosize
                 minRows={20}
                 maxLength={maxContent}
                 required
                />
           
                <div className="flex justify-end">
                  <Button type="submit">
                    Post
                  </Button>
                </div>
                
            </form>

          </>) : (<><h1>Only registered user can post.</h1></>)}
        </section>
      </main>
    </div>
  );
}
