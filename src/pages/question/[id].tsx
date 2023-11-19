import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQuery } from '@tanstack/react-query';
import styles from "./[id].module.css"
import Link from "next/link";
import { useStore } from "../../store/state/store";
import { useForm } from '@mantine/form';
import {fetchQuestion, postAnswer} from "../../store/plugins/api"
import { Button, Textarea } from '@mantine/core';
import AnswerCard from "../../components/Answer"
import Delete from "../../components/Buttons/Delete";

export default function Question() {
  const maxContent = 1000
  const setLoader = useStore((state) => state.setLoader)
  const update = useStore((state) => state.update)
  const router = useRouter();
  let routerId : string;
  if(typeof router.query.id === 'string'){
    routerId = router.query.id
  }

  const form = useForm({
    initialValues: {
      content: ""
    },
    validate: {
      content: (value) => {
        if(value.length > maxContent) {
          return 'Content is too long' 
        }
        if(value.length < 1) {
          return 'Do not leave an empty answer' 
        }
      }
  },
  });

  const [verified, setVerified] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [token, setToken] = useState<string | null>(null); 
  const authentication = useStore((state) => state.authentication)
  const setNotification = useStore((state) => state.setNotification)
  const setUpdate = useStore((state) => state.setUpdate)

  useEffect(() => {
    const token : string | null = localStorage.getItem("jwt_token")
    setToken(token)
  }, [authentication]);
  
  useEffect(() => {
    const verify = async () => {
      if(token) {
        try {
          const response = await axios.post(`${process.env.SERVER_URL}/verifyToken`, {}, {headers: {
            authorization: token
          }})
          setCurrentUser(response.data.id)
          setVerified(true)
        } catch (error) {
          setVerified(false)
        }
      }
    } 
    verify()
  }, [token]);

  let {data, isPending, isSuccess,isError, error } = useQuery({ queryKey: ['fetchQuestion', routerId, update], queryFn: async () => {
    const data = await fetchQuestion(routerId)
    if(!data) return null
    return data
  }})

  useEffect(()=>{
    
    if (isPending) setLoader(true);
    if (isError) {
      if(!error) return
      setNotification({success:false, display:true, message: error.message})
      setLoader(false)}
    if (isSuccess) setLoader(false);
  },[isPending,isSuccess])


  const mutation = useMutation({
      mutationFn: postAnswer,
      onMutate: () => setLoader(true),
      onSettled: () =>  {
        setLoader(false)
        setUpdate()
      },
      onSuccess: () => form.reset(),
      onError: (error : any) => console.log("bad stuff", error)
  })


  return (
    <div className="background">
      <main className="flex justify-center">
      {data && (
            <div className="myB max-w-7xl w-4/5 p-5 h-auto">

            <section className="flex flex-col items-center gap-y-4 border-b-2 border-cyan-400">
              <article className=" w-full mx-10">
              
              <span className="questionAuthor">
                      Asked by {data.author.name} on {" "}
                      {data.date_created.toString().split("T")[0]}
              </span>
  
              <h2 className="text-lg">{data.title}</h2>
              <p className="text-md h-full qest">{data.content}</p> 
      
              <div className="flex items-center justify-end">
              
                <svg className="opacity-70" width="30px" height="30px" viewBox="0 0 25 25" fill="#ffffff" >
                <path d="M7.5 16.5H9.5V20.5L13.5 16.5H17.5C18.6046 16.5 19.5 15.6046 19.5 14.5V8.5C19.5 7.39543 18.6046 6.5 17.5 6.5H7.5C6.39543 6.5 5.5 7.39543 5.5 8.5V14.5C5.5 15.6046 6.39543 16.5 7.5 16.5Z" stroke="#121923" strokeWidth="1.2"/>
                </svg>

              <span className="text-md my-2 opacity-70"> {data.answersCount} Answers</span>
              
              {(currentUser == data.author.id) && 
                  <Delete id={routerId}></Delete>
                  }
              </div>
  
              </article>
            </section>

            {verified ? (  
            
            <section >

                <form action="submit" onSubmit={form.onSubmit((form) => mutation.mutate({form, routerId }))}  >
                   <Textarea  {...form.getInputProps('content')} placeholder="What are you thinking?" label="Answer" name="content" maxLength={maxContent} minRows={10} autosize></Textarea>
                   <div className="flex justify-end mt-4">
                      <Button type="submit" variant="filled" size="xs">Post</Button>
                    </div>
                </form>
          
            </section>

            ) : (<h2 className="text-[#1C7ED6]">Login to leave an answer</h2>)}

            <section className="questions-wrapper">
                {data.question_answers.map((answer :any)=>{
                    return(
                      <AnswerCard
                      key={answer.id}
                      id={answer.id}
                      questionId={answer.question_id}
                      name={answer.author.name}
                      content={answer.content}
                      user={currentUser}
                      date={answer.date_created.toString().split("T")[0]}
                      author={answer.author.id}
                      upvoted={answer.upvoted_by}
                      downvoted={answer.downvoted_by}
                      upvoteCount={answer.upvotesCount}
                      downvoteCount={answer.downvotesCount}                   
                      ></AnswerCard>
                    )
                })}
            </section>
            </div>
            )                
          }             
      </main>
    </div>
  );
}
