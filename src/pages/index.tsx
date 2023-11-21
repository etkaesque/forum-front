import QuestionCard from "@/components/Question";
import Banner from "@/components/Banner";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store/state/store";
import {fetchQuestions} from "../store/plugins/api"
import {useEffect } from "react";
import { questionData } from "../types";


export default function Home() {
  const setLoader = useStore((state) => state.setLoader)
  const setNotification = useStore((state) => state.setNotification)
  const { data, isFetching, isSuccess,isError, error } = useQuery({ 
    queryKey: ['fetchQuestions'], 
    queryFn: async () => {
    const data : questionData = await fetchQuestions()
    return data
  }, staleTime: 10000 })

  useEffect(()=>{
    if (isFetching) setLoader(true);
    if (isError) {
      setNotification({success:false, display:true, message: error.message})
      setLoader(false)}
    if (isSuccess) setLoader(false);

  },[isFetching ,isSuccess])

  return (
    <>
    <main className="flex flex-col max-w-7xl mx-auto items-center gap-y-3 xl:items-start xl:max-w-5xl xl:flex-row-reverse ">
        <Banner
        count={data ? data.questionCount : 0}
        ></Banner>
        <div className="flex items-center w-3/4 flex-col gap-y-3 mb-10">
           {data && data.questions.map((question) => {
          return (
            <QuestionCard
            key={question.id}
            id={question.id}
            title={question.title}
            content={question.content}
            author={question.authorIdObect.name}
            date={question.date_created.toString().split("T")[0]}
            answers={question.answers.length}/>
          );
        })} 
        </div>
    </main>
    </>
  );
}

