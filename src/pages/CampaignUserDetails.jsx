import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import CountBoxCustom from "../components/CountBoxCustom";
import {useDispatch} from "react-redux";
import {transferPackage} from "../context/transferSlice";

const CampaignUserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, handlePass, handleCancelPass } = useStateContext();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.campaign.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.campaign.campaignId);

    setDonators(data);
  }
  const fetchPassPackage = async () => {
    setIsLoading(true)
    await handlePass(state.campaign.campaignId)
    console.log("check campaignId", state.campaign.campaignId)
    setIsLoading(false)
  }
  // console.log("check get usser campaign", state)
  const fetchCancelPassPackage = async () => {
    setIsLoading(true)
    await handleCancelPass(state.campaign.campaignId)
    setIsLoading(false)
  }
  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.campaign.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.campaign.target, state.campaign.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          {/*<CountBox title={`Raised of ${state.campaign.target}`} value={state.campaign.amountCollected} />*/}
          <CountBox title={`Price: ${state.campaign.amountCollected}`} value={state.campaign.target} />
          <CountBox title="Total Purchaser" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.campaign.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[white]">VKU_FINAL_TEAM</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[white] leading-[26px] text-justify">{state.campaign.description}</p>
              </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Owner</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {address > 0 ? <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{address}</p> : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No Purchaser yet. Be the first one!</p>
                )}
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Transfer</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Transfer a Health Package
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder={`${state.campaign?.amountCollected / donators.length}`}
                step="0.01"
                disabled={true}
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={state.campaign?.amountCollected / donators.length}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Do you want to transfer the health check-up package to another person?</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Please make sure to input the correct amount you paid for the purchase.</p>
              </div>

              {state.campaign.sellers && !state.campaign.sellers.length > 0 ?
                  <CustomButton
                      btnType="button"
                      title="Sell a Health Package"
                      styles="w-full bg-[#8c6dfd]"
                      handleClick={fetchPassPackage}
                  /> :
                  <CustomButton
                      disabled={amount !== "0.05"}
                      btnType="button"
                      title={"Cancel a Health Package Exchange"}
                      styles="w-full bg-[#8c6dfd]"
                      handleClick={fetchCancelPassPackage}
                  />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignUserDetails
