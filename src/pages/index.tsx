import { questionType } from "../../types";
import QuestionCard from "@/components/Question";
import Banner from "@/components/Banner";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store/state/store";
import {fetchQuestions} from "../store/plugins/api"
import {useEffect } from "react";

type questionData = {
  questions:  questionType[],
  questionCount : number
}

export default function Home() {
  const setLoader = useStore((state) => state.setLoader)
  const { data, isPending, isSuccess } = useQuery({ queryKey: ['fetchQuestions'], queryFn: async () => {
    const data : questionData = await fetchQuestions()
    return data
  } })

  useEffect(()=>{
    if (isPending) setLoader(true);
    if (isSuccess) setLoader(false);
  },[isPending,isSuccess])

  return (
    <>
    <main className="flex flex-col max-w-7xl mx-auto items-center gap-y-3 xl:items-start xl:max-w-5xl xl:flex-row-reverse ">
        <Banner
        count={data ? data.questionCount : 0}
        ></Banner>
        <div className="flex items-center flex-col gap-y-3 mb-10">
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

