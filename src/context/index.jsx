import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();
// 0x72Fb8BfafaD3B85331D9eEcc913B8b573865de95
// 0x112661729583938a25c5a7D614858F5FD6fF4C00
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x72Fb8BfafaD3B85331D9eEcc913B8b573865de95');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const { mutateAsync: exchangeCampaign } = useContractWrite(contract, 'exchangeToCampaign');
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      campaignId: campaign.campaignId.toNumber(),
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
      isPassed: campaign.isPassed,
      seller: campaign.seller
    }));

    return parsedCampaings;
  }

  const getCampaignsOfUser = async () => {
    try {
      const campaigns = await contract.call('getUserDonatedCampaigns', [address]);
      const parsedCampaings = campaigns.map((campaign, i) => ({
        campaign: {
          campaignId: campaign.campaign.campaignId.toNumber(),
          owner: campaign.campaign.owner,
          title: campaign.campaign.title,
          description: campaign.campaign.description,
          target: campaign.campaign.target && ethers.utils.formatEther(campaign.campaign.target.toString()),
          deadline: campaign.campaign.deadline.toNumber(),
          amountCollected: campaign.campaign.amountCollected && ethers.utils.formatEther(campaign.campaign.amountCollected.toString()),
          image: campaign.campaign.image,
          pId: i,
          isPassed: campaign.campaign.isPassed,
          sellers: campaign.campaign.sellers.map((seller) => ({
            address: seller.sellerAddress, // Địa chỉ người bán
            price: seller.price, // Giá bán
            campaignId: seller.campaignId, // ID chiến dịch mà người bán đang bán
            isPassed: seller.isPassed
          }))
        },
        sellerAddress: campaign.sellerAddress,
        price: campaign.price
      }));

      return parsedCampaings;
    } catch (error) {
      console.error("Error fetching user donated campaigns:", error);
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }
  const getCampaignsPass = async () => {
    try {
      const campaigns = await contract?.call('getPassedCampaign');
      console.log("check data2", campaigns)
      let parsedCampaings = []
      if (campaigns && campaigns.length > 0) {
        parsedCampaings = campaigns.map((campaign, i) => {
          console.log("check data", campaign)
          return ({
            campaign: {
              campaignId: campaign.campaign.campaignId.toNumber(),
              owner: campaign.campaign.owner,
              title: campaign.campaign.title,
              description: campaign.campaign.description,
              target: ethers.utils.formatEther(campaign.campaign.target.toString()),
              deadline: campaign.campaign.deadline.toNumber(),
              amountCollected: ethers.utils.formatEther(campaign.campaign.amountCollected.toString()),
              image: campaign.campaign.image,
              pId: i,
              isPassed: campaign.campaign.isPassed,
              sellers: campaign.campaign.sellers.map((seller) => ({
                address: seller.sellerAddress, // Địa chỉ người bán
                price: seller.price, // Giá bán
                campaignId: seller.campaignId, // ID chiến dịch mà người bán đang bán
                isPassed: seller.isPassed
              }))
            },
            price: ethers.utils.formatEther(campaign.price.toString()),
            sellerAddress: campaign.sellerAddress,
            timestamp: campaign.timestamp
          })
        });
      } else {
        console.log("No passed campaigns found.");
      }

      return parsedCampaings;
    } catch (error) {
      console.error("Error fetching passed campaigns:", error);
    }
  };
  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    return data;
  }
  const handlePass = async (pId) => {
    try {
      await contract?.call('passCampaign', [pId]);
      alert("Campaign pass status updated!");
    } catch (error) {
      console.error("Error passing campaign:", error);
    }
  };

  const handleCancelPass = async (pId) => {
    try {
      await contract?.call('cancelCampaign', [pId]);
      alert("Campaign cancel pass success!");
    } catch (error) {
      console.error("Error passing campaign:", error);
    }
  };


  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }
  const handleSell = async (pId, priceInEther) => {
    try {
      const data = await exchangeCampaign({
        args: [pId],
        overrides: {
          value: ethers.utils.parseEther(priceInEther),
        },
      });

      alert('Exchange Mental Health Care Package successful!');
      return data
    } catch (error) {
      console.error(error);
      alert('Error selling the campaign.');
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        disconnect,
        getCampaignsOfUser,
        handlePass,
        getCampaignsPass,
        handleSell,
        handleCancelPass
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
