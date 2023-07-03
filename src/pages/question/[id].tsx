import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../components/Header"
import styles from "./[id].module.css"

type questionType = {
    title: string;
    content: string;
    date_created: Date;
    author: String;
    authorIdObect: {};
    questionAuthorName: String,
    answersCount: number,
    question_answers: Array<any>
  };

export default function Question() {
const router = useRouter();

const [formData, setFormData] = useState({
    content: ""
})
const [question, setQuestion] = useState<questionType>()
const [verified, setVerified] = useState(false)
const [token, setToken] = useState<string | null>(null); // token 

useEffect(() => {
    let localToken = localStorage.getItem("jwt_token");
    if(localToken) {
      console.log("setting a token", localToken)
      setToken(localToken)
    }
  }, []);
  
  useEffect(() => {
    const verify = async () => {
      if(token) {
        console.log("try token", token)
        try {
          const response = await axios.post("http://localhost:8080/verifyToken", {}, {headers: {
            authorization: token
          }})
          setVerified(true)
        } catch (error) {
          console.log(error)
          setVerified(false)
        }
      }
    } 
    verify()
  }, [token]);


  const getQuestion = async () => {

    try {

      let question_answers_data;

      if(verified) {

        const response = await axios.get(
          `http://localhost:8080/question/${router.query.id}/answers/v`,
          {headers: 
            {
            authorization: token
            }
          }
        );

        question_answers_data = response.data.questionsWithAnswers[0]
      } else {
        
        const response = await axios.get(
        `http://localhost:8080/question/${router.query.id}/answers`,
        
      );

      question_answers_data = response.data.questionsWithAnswers[0]

      }


      console.log( question_answers_data)
       
      setQuestion( question_answers_data)

    } catch (error) {
      console.log("Error when getting a question", error);
    }
  };

  
  useEffect(() => {


    getQuestion();
  }, [verified]);



   
function handleChange(event: any) {
    const { name, value } = event.target;


    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]:value
      };
    });
  }

async function handleSumbit(event: any) {
   
    console.log("Sending a form to server");

    try {
      const response = await axios.post(
        `http://localhost:8080/question/${router.query.id}/answer`,
        formData, 
        {headers: 
          {
          authorization: token
          }
        })
      
      

    } catch (error) {
      console.log("Failed to save data to database, error: ", error);
    }
  }
  

async function handleUpvote(id : string) {

    try {
        const response = await axios.put(
          `http://localhost:8080/answer/${id}/upvote`,
           {},
          {headers: 
            {
            authorization: token
            }
          })

          getQuestion()
          console.log(response.data.response)
        
        
  
      } catch (error) {
        console.log("Failed to save data to database, error: ", error);
      }
    }





async function handleDownvote(id:any) {

    try {
        console.log("um")
        const response = await axios.put(
          `http://localhost:8080/answer/${id}/downvote`,
           {},
          {headers: 
            {
            authorization: token
            }
          })
        
          getQuestion()
  
      } catch (error) {
        console.log("Failed to save data to database, error: ", error);
      }
    

    
}



//   const deleteFromDb = async () => {
//     const response = await axios.delete(
//       `http://localhost:8080/deleteTrip/${router.query.id}`
//     );

//   };



  return (
    <div className="background">
      <Header></Header>

      <main className="flex justify-center">
      
      {question && (
            <div className="sectionStyles3 max-w-7xl w-4/5">
            <section className="p-2 flex flex-col items-center gap-y-4 ">
              <article className=" w-full mx-10">
              
              <span className="questionAuthor">
                      Asked by {question.author.name} on {" "}
                      {question.date_created.toString().split("T")[0]}
              </span>
  
              <h2 className="questionh2">{question.title}</h2>
              <p className="questionContent">{question.content}</p> 
        
  
              <div className="flex items-center">
                          
              <svg className="opacity-70" width="40px" height="40px" viewBox="0 0 25 25" fill="#ffffff" >
              <path d="M7.5 16.5H9.5V20.5L13.5 16.5H17.5C18.6046 16.5 19.5 15.6046 19.5 14.5V8.5C19.5 7.39543 18.6046 6.5 17.5 6.5H7.5C6.39543 6.5 5.5 7.39543 5.5 8.5V14.5C5.5 15.6046 6.39543 16.5 7.5 16.5Z" stroke="#121923" stroke-width="1.2"/>
              </svg>
              <span className="text-lg my-2 opacity-70">Answers {question.answersCount}</span>
  
              </div>
      
  
              </article>
            </section>

            {verified ? (  <section className="p-2 flex flex-col gap-y-4  w-full">
                <h3>Leave an answer</h3>

                <form action="submit" onSubmit={handleSumbit}>
  
                   <textarea placeholder="What are you thinking?" onChange={handleChange} className={styles.content}  name="content" value={formData.content} maxLength={1000} required></textarea>

                    <div className="flex justify-end">

                        <button type="submit" className="text-white mainColorBackground hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Post
                        </button>

                    </div>
                </form>
              
            
                

            </section>) : (<button className={styles.button}>Leave a comment</button>)}

            <section>
                {question.question_answers.map((answer :any)=>{
                    return(
                        <article>

                            <span className="questionAuthor">{answer.author.name} on {answer.date_created.toString().split("T")[0]}</span>
                            <p>{answer.content}</p>
                            <div className="flex items-center gap-x-2">
                                <button onClick={() => handleUpvote(answer.id)}><svg fill={answer.userUpvoted ? "#5023D9" : "#ffffff"} width="25px" height="25px" viewBox="0 0 32 32" enable-background="new 0 0 32 32"><path d="M29.845,17.099l-2.489,8.725C26.989,27.105,25.804,28,24.473,28H11c-0.553,0-1-0.448-1-1V13  c0-0.215,0.069-0.425,0.198-0.597l5.392-7.24C16.188,4.414,17.05,4,17.974,4C19.643,4,21,5.357,21,7.026V12h5.002  c1.265,0,2.427,0.579,3.188,1.589C29.954,14.601,30.192,15.88,29.845,17.099z" id="XMLID_254_"/><path d="M7,12H3c-0.553,0-1,0.448-1,1v14c0,0.552,0.447,1,1,1h4c0.553,0,1-0.448,1-1V13C8,12.448,7.553,12,7,12z   M5,25.5c-0.828,0-1.5-0.672-1.5-1.5c0-0.828,0.672-1.5,1.5-1.5c0.828,0,1.5,0.672,1.5,1.5C6.5,24.828,5.828,25.5,5,25.5z" id="XMLID_256_"/></svg></button>
 <span>{answer.upvotesCount}</span>
                            <button onClick={()=> handleDownvote(answer.id)}><svg fill={answer.userDownvoted ? "#5023D9" : "#ffffff"} width="25px" height="25px" viewBox="0 0 32 32" enable-background="new 0 0 32 32"><path d="M2.156,14.901l2.489-8.725C5.012,4.895,6.197,4,7.528,4h13.473C21.554,4,22,4.448,22,5v14  c0,0.215-0.068,0.425-0.197,0.597l-5.392,7.24C15.813,27.586,14.951,28,14.027,28c-1.669,0-3.026-1.357-3.026-3.026V20H5.999  c-1.265,0-2.427-0.579-3.188-1.589C2.047,17.399,1.809,16.12,2.156,14.901z" id="XMLID_259_"/><path d="M25.001,20h4C29.554,20,30,19.552,30,19V5c0-0.552-0.446-1-0.999-1h-4c-0.553,0-1,0.448-1,1v14  C24.001,19.552,24.448,20,25.001,20z M27.001,6.5c0.828,0,1.5,0.672,1.5,1.5c0,0.828-0.672,1.5-1.5,1.5c-0.828,0-1.5-0.672-1.5-1.5  C25.501,7.172,26.173,6.5,27.001,6.5z" id="XMLID_260_"/></svg></button>
 <span>{answer.downvotesCount}</span>
                            </div>



                        </article>
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