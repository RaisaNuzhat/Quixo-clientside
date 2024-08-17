/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import { Navigate, useLocation } from "react-router-dom";
import Skeleton , { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const Privateroute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();
    if(loading)
    {    
        // return <div className="flex justify-center items-center container my-10 w-1/2 h-1/2 text-center font-bold ">
        //   <span className="loading loading-spinner text-success"></span>
        // </div>
        return (
            <div className="flex justify-center items-center container my-10 w-full h-screen text-center font-bold">
              <div className="w-1/2">
              <SkeletonTheme baseColor="#ff9a3c" highlightColor="#444">

                <Skeleton height={40} count={6} />
                </SkeletonTheme>
              </div>
            </div>
          );  
    }
    if(!user)

    {
        return <Navigate to = '/' state ={location?.pathname || '/'}/>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default Privateroute;