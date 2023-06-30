import Header from "../../components/Header";
import styles from "./Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Home() {

    const router = useRouter()
    const [formData, setFormData] = useState({

    });
  
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
          "http://localhost:8080/",
          formData
        );
  
        if (response) {
          router.push('/');
        }
  
      } catch (error) {
        console.log("Failed to save data to database, error: ", error);
      }
    }


  return (
    <div className="background">
      <Header />

      <main className="flex justify-center ">
        <section className=" relative max-w-7xl mx-10">
          <div className="sectionStyles">
            
            <form action="submit">
                <label htmlFor="title">Title</label>
                <textarea name="question">Question</textarea>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
