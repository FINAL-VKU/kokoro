import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import {Login} from "./pages/auth/components/Login";
import {useSelector} from "react-redux";
import CampaignUserDetails from "./pages/CampaignUserDetails";
import PagePass from "./pages/PagePass";
import CampaignExchangeDetails from "./pages/CampaignExchangeDetails";

const App = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">

              <>
                  {isLoggedIn && <div className="sm:flex hidden mr-10 relative">
                      <Sidebar/>
                  </div>}

                  <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                      {isLoggedIn && <Navbar/>}

                      <Routes>
                          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
                          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
                          {isLoggedIn && <>
                              <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
                              <Route path="/home" element={<Home/>}/>
                              <Route path="/profile" element={<Profile/>}/>
                              <Route path="/exchange-package" element={<PagePass/>}/>
                              <Route path="/exchange-package-details/:id" element={<CampaignExchangeDetails/>}/>
                              <Route path="/create-campaign" element={<CreateCampaign/>}/>
                              <Route path="/campaign-details/:id" element={<CampaignDetails/>}/>
                              <Route path="/campaign-user-details/:id" element={<CampaignUserDetails/>}/>
                          </> }
                      </Routes>
                  </div>
              </>
      </div>
  )
}

export default App
