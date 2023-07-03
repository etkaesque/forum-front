import Header from "../../components/Header";
import styles from "./index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { space } from "postcss/lib/list";

export default function Home() {

    const [formData, setFormData] = useState({
      title: "",
      content: ""

    });

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

    // if token valid display page if not display: Only signin in users can post a question, click astronaut to log in.

    const router = useRouter()
   
    function handleChange(event: any) {
      const { name, value } = event.target;
  
  
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [name]:value
        };
      });
      console.log(formData);
    }
  
    async function handleSumbit(event: any) {
      event.preventDefault(); 
      console.log("Sending a form to server");
  
      try {
        const response = await axios.post(
          "http://localhost:8080/askQuestion",
          formData, 
          {headers: 
            {
            authorization: token
            }
          })
        

        router.push('/');
        
  
      } catch (error) {
        console.log("Failed to save data to database, error: ", error);
      }
    }

    console.log(verified)
  return (
    <div className="background">
      <Header />

      <main className="flex justify-center ">
      
        <section className=" sectionStyles relative max-w-7xl  w-3/4  mx-10">

          {verified ? (
          <>
          
          <h1 className="text-2xl mb-3 ">Post A Question</h1>

         
            <form action="submit" onSubmit={handleSumbit} className="flex flex-col gap-3">
  
                <input placeholder="Title" onChange={handleChange} className={styles.title}  name="title" value={formData.title} maxLength={50} required />

                <textarea placeholder="Question" onChange={handleChange} className={styles.content}  name="content" value={formData.content} maxLength={1000} required></textarea>

                <div className="flex justify-end">

                <button type="submit" className="text-white mainColorBackground hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Post
                </button>

                </div>
                

            </form>

          </>) : (<><h1>Only registered user can post questions.</h1></>)}

         
        </section>
      </main>
    </div>
  );
}
