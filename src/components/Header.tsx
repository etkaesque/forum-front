import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import LoginButton from "./Buttons/LoginButton";
import { useStore } from "@/store/state/store";
import { fetchUser } from "../store/plugins/api"
import { useQuery } from "@tanstack/react-query";

const logoStyle = {
  width: '80px', 
  'border-radius': '50px'
}

export default function Header() {
    
    const authentication = useStore((state) => state.authentication)
    const {data, isSuccess, isError} = useQuery({ queryKey: ['fetchUser', authentication], queryFn: fetchUser})

    return (
    <div className="flex justify-center w-auto">
      <header className="flex justify-between items-center max-w-7xl w-3/4 mx-10 p-5 xl:w-full">
        <Link rel="" href={`/`}>
              <img src="/images/logo.png" alt="" style={logoStyle} />
        </Link>
        {data ? <UserMenu name={data.user.name} email={data.user.email}></UserMenu> : <LoginButton></LoginButton>}
      </header>
    </div>
      
  );
}
