import React from "react";
import styles from "../login/login.module.css"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";


export default function Login() {
  const router = useRouter();
  const [isLogin, setIslogin] = useState(false);
  const [serverResponse, setServerResponse] = useState<string>("");
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  
  const handleLoginUser = (event: any) => {
    const { name, type, value } = event.target;

    setLoginUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  
  const handleChange = (event: any) => {
    const { name, type, value } = event.target;

    setNewUser((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };


  
  const changeSection = (event: any) => {
    setIslogin(!isLogin);
  };

  
  const handleLoginSumbit = async (event: any) => {
    event.preventDefault();
    console.log("sending:", loginUser)

    try {
      const response = await axios.post(
        "https://forum-back.onrender.com/login",
        loginUser
      );

      localStorage.setItem("jwt_token", response.data.jwt_token);
      localStorage.setItem(
        "jwt_refresh_token",
        response.data.jwt_refresh_token
      );

      router.push("/")
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleRegisterSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://forum-back.onrender.com/signUp",
        newUser
      );

      localStorage.setItem("jwt_token", response.data.jwt_token);
      localStorage.setItem(
        "jwt_refresh_token",
        response.data.jwt_refresh_token
      );

      router.push("/")
    } catch (error: any) {
      setServerResponse(error.response.data.response);
      console.log("could not validate new user: ", error);
    }
  };

  const handleCancel = () => {
    router.push("/")
  }




    return (

      <div className="background">

  
        <main className="flex justify-center w-screen h-screen items-center">

    
        <div className={styles.userSection}>
          {isLogin ? (
            <section className="w-full mx-2">
              <div className="flex flex-col content-center items-center justify-center m-6">
                <h1 className="text-2xl ">Register</h1>
                <button
                  onClick={changeSection}
                  className="text-green-500 hover:opacity-70 text-sm"
                >
                  Already have an account? Log In here.
                </button>
              </div>

              <div>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                      >
                        First name
                      </label>
                      <input
                        onChange={handleChange}
                        value={newUser.name}
                        type="text"
                        id="name"
                        name="name"
                        className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium  text-white dark:text-gray-300"
                    >
                      Email address
                    </label>
                    <input
                      onChange={handleChange}
                      value={newUser.email}
                      type="email"
                      id="email"
                      name="email"
                      className="bg-white border border-gray-300  text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      value={newUser.password}
                      type="password"
                      id="password"
                      name="password"
                      className="bg-white border border-gray-300  text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="confirm_password"
                      className="block mb-2 text-sm font-medium  text-white dark:text-gray-300"
                    >
                      Confirm password
                    </label>
                    <input
                      onChange={handleChange}
                      value={newUser.confirm_password}
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      className="bg-white border border-gray-300  text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="•••••••••"
                      required
                    />
                  </div>

                  <div className="flex justify-evenly">
                    
                  <button
                    type="submit"
                    className="text-white mainColorBackground hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  
                    Submit
                  </button>

                  <Link href={"/"} 
                  
                  className="text-white mainColorBackground hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>

                    Cancel

                  </Link>
                  </div>

                </form>

                <div className="text-red-600 flex justify-center my-2">
              
                  {serverResponse && (
                    <p className={styles.serverRes}>{serverResponse}</p>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="w-full mx-2">
              <div className="flex flex-col content-center items-center justify-center m-6">
                <h1 className="text-2xl ">Log In</h1>
                <button
                  onClick={changeSection}
                  className="text-green-500 hover:opacity-70 text-sm"
                >
                  Don't have an account? Click here!
                </button>
              </div>

              <form onSubmit={handleLoginSumbit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <input
                    onChange={handleLoginUser}
                    value={loginUser.email}
                    type="email"
                    id="email"
                    name="email"
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleLoginUser}
                    value={loginUser.password}
                    type="password"
                    id="password"
                    name="password"
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                  />
                </div>

                <div className="flex justify-evenly">

                <button
                  type="submit"
                  className="text-white mainColorBackground hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>

       
                  <Link href={"/"} 
                  
                  className="text-white mainColorBackground hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>

                    Cancel

                  </Link>

                </div>

               
              </form>
            </section>
          )}
        </div>

    
      
      
        </main>

      </div>
    );
  }