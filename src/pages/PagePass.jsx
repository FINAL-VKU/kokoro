import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DetailPackagePass from "../components/DetailPackagePass";

const PagePass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignsPassed, setCampaignsPassed] = useState([]);

  const { address, contract, getCampaignsPass } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaignsPass();
    setCampaignsPassed(data);
    setIsLoading(false);
  }
  useEffect(() => {
    if(contract) fetchCampaigns().then();
  }, [address, contract]);
  console.log("exchange <<<>>>>", campaignsPassed)
  return (
    <DetailPackagePass
      title="Mental Health Care Package Exchange"
      isLoading={isLoading}
      campaigns={campaignsPassed}
    />
  )
}

export default PagePass
