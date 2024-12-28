import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { loader } from '../assets';
import FundCardPass from "./FundCardPass";

const DisplayCampaignDetail = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-user-details/${campaign.title}`, { state: campaign })
  }
    console.log("check", campaigns)
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-left text-black">{title} ({campaigns?.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[white]">
              You don't have any mental health packages.
          </p>
        )}

        {!isLoading && campaigns?.length > 0 && campaigns.map((campaign) => {
            return (
                <FundCardPass
                    key={uuidv4()}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />
            )
        })}
      </div>
    </div>
  )
}

export default DisplayCampaignDetail
