import Header from "../components/Header";
import styles from "./Home.module.css";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

type questionType = {
  id:string,
  title: string;
  content: string;
  date_created: Date;
  author: String;
  authorIdObect: {
    name: string
  };
  answers: Array<string>
};



export default function Home({ data, count }: { data: questionType[], count: number }) {

  const [unansweredOnly, setUnansweredOnly] = useState(true)

  const handleAnsweredOnly = () => {

    setUnansweredOnly(!unansweredOnly)


  }
  



  return (
    <div className="background w-screen">
      <Header />

      <main className="flex flex-col items-center gap-y-3">
        <section className="  flex flex-col gap-y-6 relative sectionStyles max-w-7xl w-3/4 mx-10 ">
          <div className=" justify-end items-center text-center flex flex-col sm:flex-row justify-center items-end gap-x-2">
    
            <span>Browse all {count} questions</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full text-sm justify-between items-center gap-y-6">

          

              <div>
              
                 Change to:  <button className="button" onClick={handleAnsweredOnly}>{unansweredOnly? "Unanswered Only" : "All Questions"}</button>

              </div>

                  
            <Link href={"/ask"} className="button w-full sm:w-auto text-center">
                Ask here
              </Link>
      
        
          </div>
        </section>


        {unansweredOnly ? (   
          data && data.map((question) => {
            return (
              <article className="sectionStyles2 relative max-w-7xl w-3/4 mx-10">
                <Link className="questionStyle" href={`question/${question.id}`}>
                  <span className="questionAuthor">
                    Asked by {question.authorIdObect.name} on{" "}
                    {question.date_created.toString().split("T")[0]}
                  </span>
                  <h2 className="questionh2">{question.title}</h2>
                  <p className="questionContent">{question.content}</p>
                  <div className="flex items-center">
                          
                          <svg className="opacity-70" width="40px" height="40px" viewBox="0 0 25 25" fill="#ffffff" >
                          <path d="M7.5 16.5H9.5V20.5L13.5 16.5H17.5C18.6046 16.5 19.5 15.6046 19.5 14.5V8.5C19.5 7.39543 18.6046 6.5 17.5 6.5H7.5C6.39543 6.5 5.5 7.39543 5.5 8.5V14.5C5.5 15.6046 6.39543 16.5 7.5 16.5Z" stroke="#121923" stroke-width="1.2"/>
                          </svg>
                          <span className="text-lg my-2 opacity-70"> {question.answers.length} Answers</span>
              
                  </div>
                </Link>
              </article>
            );
          })) : (   
            data && data.map((question) => {
              let answersArray = question.answers
              if(answersArray?.length === 0) {

                return (
                  <article className="sectionStyles2 relative max-w-7xl w-3/4 mx-10">
                    <Link className="questionStyle" href={`question/${question.id}`}>
                      <span className="questionAuthor">
                        Asked by {question.authorIdObect.name} on{" "}
                        {question.date_created.toString().split("T")[0]}
                      </span>
                      <h2 className="questionh2">{question.title}</h2>
                      <p className="questionContent">{question.content}</p>
                      <div className="flex items-center">
                            
                            <svg className="opacity-70" width="40px" height="40px" viewBox="0 0 25 25" fill="#ffffff" >
                            <path d="M7.5 16.5H9.5V20.5L13.5 16.5H17.5C18.6046 16.5 19.5 15.6046 19.5 14.5V8.5C19.5 7.39543 18.6046 6.5 17.5 6.5H7.5C6.39543 6.5 5.5 7.39543 5.5 8.5V14.5C5.5 15.6046 6.39543 16.5 7.5 16.5Z" stroke="#121923" stroke-width="1.2"/>
                            </svg>
                            <span className="text-lg my-2 opacity-70"> {question.answers.length} Answers</span>
                
                    </div>
                    </Link>
                  </article>
                );

              }
           
            }))}

     


      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("https://forum-back.onrender.com/allQuestions");
  const data = response.data.questions;
  const count = response.data.questionCount;

  console.log("count is ", count);

  return { props: { data, count } };
}
