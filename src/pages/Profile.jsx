import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DisplayCampaignDetail from "../components/DisplayCampaignDetail";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignsOfUser, setCampaignsOfUser] = useState([]);

  const { address, contract, getCampaignsOfUser } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaignsOfUser();
    setCampaignsOfUser(data);
    setIsLoading(false);
  }
  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <DisplayCampaignDetail
      title="Mental Health Care Package"
      isLoading={isLoading}
      campaigns={campaignsOfUser}
    />
  )
}

export default Profile
