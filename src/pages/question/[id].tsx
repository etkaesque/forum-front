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

type questionType = {
    id: string;
    title: string;
    content: string;
    date_created: Date;
    author: {
      name: string,
      id:string,
    };
    authorIdObect: {};
    questionAuthorName: String,
    answersCount: number,
    question_answers: Array<any>
  };

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

  let {data, isSuccess, isPending} = useQuery({ queryKey: ['fetchQuestion', routerId,update], queryFn: async () => {
    const data = await fetchQuestion(routerId)
    if(!data) return null
    return data
  }})

  useEffect(()=>{
    if (isPending) setLoader(true);
    if (isSuccess) setLoader(false);
  },[isPending,isSuccess])


  const mutation = useMutation({
      mutationFn: postAnswer,
      onMutate: () => setLoader(true),
      onSettled: () => setLoader(false),
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
                  <button  className="mx-3">
                      <svg  className="opacity-70 hover:opacity-30" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <g id="Interface / Trash_Full">
                            <path id="Vector" d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                      </svg>
                  </button>}
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
