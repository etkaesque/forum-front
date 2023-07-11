import React from "react";
import "./Header.module.css";
import Link from "next/link";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // token 
  const [userData, setUserData] = useState<{ name: string } | null>(null);

  const deleteTokenAndData = () => {
    console.log("deleleting")
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("jwt_refresh_token");
    setToken(null);
    setUserData(null);
    router.reload()
  };

  useEffect(()=>{

      if(localStorage.getItem("jwt_token")) {
          console.log("setting a token", localStorage.getItem("jwt_token"))
        setToken(localStorage.getItem("jwt_token"))
      }
  

  },[])

  useEffect(() => {

    const getUser = async () => {
      try {
        const response = await axios.get("https://forum-back.onrender.com/user", {
          headers: {
            authorization: token
          }
        })
  
        console.log("hello")
  
        if (response.status === 401) {
          console.log("401 error, deleting token")
          deleteTokenAndData()
        }
  
        setUserData(response.data.user)
  
      } catch (error : any) {
        if (error.response && error.response.status === 401) {
          console.log("401 error, deleting token");
          deleteTokenAndData();
        }
      }
    }
  
    if(token) {
      console.log("hello, token")
      getUser()
    }
  
  },[token])

  const handleRedirectToLogin = () => {
    router.push("/login")
  }





  return (
    <header className="group relative flex  justify-center mx-auto sm:w-full h-auto mb-6">
      <div className="absolute inset-0 group-hover:bg-black opacity-50 z-0 transition duration-500 ease-in-out w-screen"></div>
      <div className="relative grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 justify-items-center items-center max-w-7xl mx-10 bg-transparent  py-7 px-5 w-full z-10">
        <Link rel="" href={`/`}>
          <div className=" flex items-center gap-x-2 text-white text-2xl tracking-widest  transition duration-600 ease-in-out">
            <img src="/images/spacecat44.png" alt="" className="w-12 h-12" />
            <span>Space</span> <span className={styles.talk}>Talk</span>
          </div>
        </Link>

        <div className="text-white text-lg flex justify-evenly">
          
          <Link
            className="hover:opacity-80 transition duration-500 ease-in-out"
            href={"/"}
          >
            Forum
          </Link>

  

        </div>

        {userData ? 
        (<div className="text-white flex justify-end gap-x-2">Welcome, {userData.name} 
        <button onClick={deleteTokenAndData}>
<svg width="20px" height="20px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" version="1.1"  ><polygon fill="#ffffff"  points="9,2 9,0 1,0 1,12 9,12 9,10 8,10 8,11 2,11 2,1 8,1 8,2 "/><polygon fill="#ffffff" points="8.2929688,3.2929688 7.5859375,4 9.0859375,5.5 5,5.5 5,6.5 9.0859375,6.5 7.5859375,8   8.2929688,8.7070313 11,6 "/></svg></button>
        
        
        
        </div>) : (
        <div className="flex justify-end text-white transition duration-500 ease-in-out">
          <button onClick={handleRedirectToLogin} className={styles.loginLink}>
            <svg className="w-12 h-12" viewBox="0 0 64 64">
              <path
                d="m9.19 25s.88-7.71 6.46-11.79 9.42-5.42 17.58-4.92 11.59 5.25 13.59 7.33 3.18 8.6 3.18 8.6 1.42.37 1.46 1.25l.09 2a9.2 9.2 0 0 0 2.16-.09c0-.16-.58-12.66-.58-12.66s-2.29-.75-2.38-2.5 1.38-3.38 3.84-2.59.71 4.59.71 4.59 1.5 14.5 1.37 15.08-.71.75-1 .83-4-.2-4-.2a9.55 9.55 0 0 1 -.21 3c-.33.55-2 .88-2 .88a14.19 14.19 0 0 1 -.46 3.37 5.33 5.33 0 0 1 -1 2.21s2.54 6.45 2.5 6.83-5.88 5.83-12.75 8.37-14.75.8-19-1.7-7.3-5.88-7.5-6.5 2-5.34 2-5.34-1.13-2.33-1.79-4a27.18 27.18 0 0 1 -1-2.91s-2.46-.63-2.68-1.21-.63-6.88-.34-7.38 1.38-.55 1.75-.55z"
                fill="#1d1d1b"
              />

              <path
                d="m9.15 26.59s1.54-.16 1.58.13a44.78 44.78 0 0 1 0 5.92 1.47 1.47 0 0 1 -1.12-.13c-.17-.17-.75-5.67-.46-5.92z"
                fill="#e7413e"
              />

              <path
                d="m48.65 25.51c.12-.12 1.08.13 1.13.38a47.25 47.25 0 0 1 0 5.83 1.28 1.28 0 0 1 -1.09.12c-.08-.12-.08-6.29-.04-6.33z"
                fill="#e7413e"
              />

              <path
                d="m53.19 10.64c1-.36 1.54.41 1.67 1.45a1.31 1.31 0 0 1 -1.86 1.34 1.5 1.5 0 0 1 .19-2.79z"
                fill="#e6e4da"
              />

              <path
                d="m51.94 28.26c.13 0 2.79 0 2.79-.25s-.5-8.42-.25-8.62.3.08.42.33a80.14 80.14 0 0 1 .67 9 11.69 11.69 0 0 1 -3.63.12c-.16-.12 0-.58 0-.58z"
                fill="#e6e4da"
              />

              <path
                d="m12.19 25.18s-1.41.12-1.54 0a17.84 17.84 0 0 1 3.71-8.18 16.24 16.24 0 0 1 6.25-4.92s.08 1.63.29 1.71a10.19 10.19 0 0 0 3.17-.17c.16-.25-.25-2.91-.13-3a6.7 6.7 0 0 1 1.84-.33 31.61 31.61 0 0 0 .29 4 6.72 6.72 0 0 0 2.25.21 3.27 3.27 0 0 0 1.75-.5c0-.13-.54-4-.42-4a3.84 3.84 0 0 1 .42-.08s.21 3.54.46 3.5 3.16-.13 3.12-.46-.46-3.25-.21-3.21a16.34 16.34 0 0 1 8.71 3.62c3.85 3.27 5.85 10.22 5.75 10.31a5.21 5.21 0 0 1 -.71.25s-5.46-5.63-10.66-6.46-9.46-1.38-14.92 1.12a35 35 0 0 0 -9.42 6.59z"
                fill="#cbe7f5"
              />

              <path
                d="m21.61 11.68c.17-.09 1.33-.5 1.33-.5s.34 1.5.13 1.58a7.31 7.31 0 0 1 -1.21.08z"
                fill="#e7413e"
              />

              <path
                d="m26.73 10.09a11.16 11.16 0 0 1 2-.08c0 .13.25 3.46.13 3.5a6.06 6.06 0 0 1 -1.71.13 17.53 17.53 0 0 1 -.42-3.55z"
                fill="#e7413e"
              />

              <path
                d="m31 9.89a14.11 14.11 0 0 1 1.46 0 13.82 13.82 0 0 1 .13 2.25c-.13 0-1.25.12-1.25.12z"
                fill="#e7413e"
              />

              <path
                d="m12.44 27.05a39.91 39.91 0 0 1 8.88-6.46c4.16-2 9.58-2.08 13.33-1.45s7.08 3.08 9.42 4.7 2.54 2.21 2.54 2.21a62.32 62.32 0 0 0 .29 6.5 4.31 4.31 0 0 0 .75 1 16.23 16.23 0 0 1 -1.65 4.5 16 16 0 0 1 -3.83 5 25.72 25.72 0 0 1 -3.27 1.95s-2.83-2.75-3-2.79-.83.46-.71.71 3.13 2.41 2.88 2.58a24.57 24.57 0 0 1 -8.59 1.83 18.52 18.52 0 0 1 -11.87-4.58 24 24 0 0 1 -5.17-8.5c-.08-.25-.04-7.11 0-7.2z"
                fill="#1f4863"
              />

              <path
                d="m22.57 23.68c.5 0 1 .91.54 1.66s-2.75 3.55-2.54 6.17a7.61 7.61 0 0 0 1.91 4.83c.75.84 1.17.75 1.17 1.13s0 .42-.25.5a7.8 7.8 0 0 1 -5.67-1c-2.37-1.62-2.41-5.25-2.29-6.54s.79-6.54 7.13-6.75z"
                fill="#1d1d1b"
              />

              <path
                d="m21.15 24.72c.46-.07.75.29.54.46s-2.71 3-2.58 6 .89 4.33 1.37 4.82.71.71.59.83a4.7 4.7 0 0 1 -3.79-2.2c-1.25-2-.42-5.46.25-6.8s1.62-2.83 3.62-3.11z"
                fill="#e6e4da"
              />

              <g fill="#1d1d1b">
                <path d="m40.53 22.68a4.3 4.3 0 0 1 1.87 1.37c0 .25-.08.46-.21.42a13 13 0 0 1 -1.83-1.13.46.46 0 0 1 .17-.66z" />

                <path d="m40.86 26.76a18.48 18.48 0 0 1 3.71 2.08c0 .25 0 .5-.13.5s-3.44-1.66-3.62-1.75-.17-.79.04-.83z" />

                <path d="m41.07 29.68a23.55 23.55 0 0 1 3.83 2.5c0 .25.08.62-.08.58s-3.79-2.12-4-2.33.12-.75.25-.75z" />

                <path d="m40.9 32.76a22.92 22.92 0 0 1 3.83 2.63c.05.2-.25.54-.25.54a43.57 43.57 0 0 1 -3.87-2.38c-.04-.21.29-.79.29-.79z" />

                <path d="m39.86 35.76a55.13 55.13 0 0 1 4.5 3.24c-.08.17-.13.54-.29.46s-4.67-2.79-4.67-3 .46-.7.46-.7z" />

                <path d="m38.9 38.26a29.46 29.46 0 0 1 4 3.25 2 2 0 0 1 -.46.38s-4-2.92-4.08-3.13.29-.46.54-.5z" />

                <path d="m37.36 40.3a18.9 18.9 0 0 1 3.42 2.79 2.3 2.3 0 0 1 -.46.38 33.32 33.32 0 0 1 -3.42-2.58.94.94 0 0 1 .46-.59z" />
              </g>

              <path
                d="m28.53 23.72a3.31 3.31 0 0 1 1 .08s.08-1.41.37-1.5.58 0 .58.13.09 1.21.09 1.21 1.16-.63 1.29-.46-.08.75-.08.75.41.25.41.41a1 1 0 0 1 -.16.42s-1.42-.25-1.42 0a10.27 10.27 0 0 0 .46 1.46l-.63.25s-.5-.88-.58-.71a2.22 2.22 0 0 1 -.75.67c-.13 0-.46-.5-.46-.5s.83-1.09.71-1.17-1-.29-1-.46a.88.88 0 0 1 .17-.58z"
                fill="#e6e4da"
              />

              <path
                d="m34.73 36.49c.09-.06.59 0 .59 0s0-.84.23-.89.34 0 .34.07 0 .72 0 .72.69-.37.76-.27-.05.44-.05.44.25.15.25.25a.62.62 0 0 1 -.1.24s-.75-.05-.75.05a5.8 5.8 0 0 0 .28.86l-.37.15s-.3-.52-.35-.42a1.36 1.36 0 0 1 -.44.4c-.08 0-.27-.3-.27-.3s.49-.64.42-.69-.62-.17-.62-.27a.54.54 0 0 1 .08-.34z"
                fill="#e6e4da"
              />

              <path
                d="m23.18 40.09c.17-.12.37-.33.58-.21s.38 1.09.38 1.09.87 0 1 .21a2 2 0 0 1 -.05.75h-.66l.12.92h-.41l-.59-.79s-.33.58-.46.54a7.12 7.12 0 0 1 -.7-.46l.66-.66s-.83-.17-.83-.42 0-.54.17-.5.62.25.66.13z"
                fill="#e6e4da"
              />

              <path
                d="m27.92 32.59c.17-.08.87-.41.87-.29s-.08.79.21.79 1.13-.08 1.13.09.29.5 0 .54-1 .17-1 .17l.12 1h-.5c-.25 0-.5-.91-.5-.91s-.71-.17-.71-.29a3.68 3.68 0 0 1 .05-.42h.37z"
                fill="#e6e4da"
              />

              <path
                d="m35.69 28.05c.17-.08.88-.41.88-.29s-.09.79.21.79 1.12-.08 1.12.09.29.5 0 .54-1 .16-1 .16l.13 1h-.5c-.25 0-.5-.91-.5-.91s-.71-.17-.71-.3 0-.41 0-.41h.37z"
                fill="#e6e4da"
              />

              <path
                d="m29.4 39.2c.17-.08.67-.12.75.08s.67.5.67.5l.58 1.22-.37.38s-.67.46-.75.29a4 4 0 0 0 -.38-.5l-.37.54-.8-.33s-.25-.67.05-.88.54-.08.5-.33a2 2 0 0 1 .12-.97z"
                fill="#e6e4da"
              />

              <path
                d="m14.48 42.72c.23.15 1.34 1.42 2 2a9.93 9.93 0 0 0 1 .79s-1.54 2.54-1.79 2.5a10.88 10.88 0 0 1 -2.54-2.08 11.66 11.66 0 0 1 1.33-3.21z"
                fill="#cbe7f5"
              />

              <path
                d="m18.07 45.64c.12-.09.5.12.41.25s-1.54 3.16-1.66 3.16-.63-.08-.5-.25 1.58-3.04 1.75-3.16z"
                fill="#e7413e"
              />

              <path
                d="m19.07 46.51.41.25a22.93 22.93 0 0 1 -1.54 3.29c-.16-.08-.46-.16-.46-.29s1.59-3.25 1.59-3.25z"
                fill="#e7413e"
              />

              <path
                d="m20.15 47.05a17.88 17.88 0 0 0 7.92 2.09c4.83.2 6.54.12 10.79-2a21.89 21.89 0 0 0 6.5-4.5 12.31 12.31 0 0 1 1.46-1.25s1.66 4.34 1.58 4.5a1.74 1.74 0 0 1 -.46.42 21.86 21.86 0 0 0 -1.79-2.92c-.21 0-.67.71-.67.71s1.67 2.46 1.5 2.71a5.08 5.08 0 0 1 -1.16.75 15.42 15.42 0 0 0 -1.42-2.42c-.25-.08-.92.42-.83.63s1.54 2.46 1.54 2.46-.83.75-1 .66-1.21-2.16-1.37-2.16-.67.58-.67.58 1.54 2 1.37 2.17l-.75.58-1.41-2.12s-.63.25-.63.41 1.46 2.38 1.38 2.5-2.46 2-7.75 2.63-8.63.12-11.54-.84-4.05-1.87-4.09-2a14.52 14.52 0 0 1 1.5-3.59z"
                fill="#cbe7f5"
              />
            </svg>
          </button>
        </div>)}

      </div>
    </header>
  );
}
