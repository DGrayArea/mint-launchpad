// pages/api/saveNftHolders.js
import fs from "fs";
import path from "path";
import data from "@/config/json/TotalHolders.json";

//5-9k
// const owned = [5326, 5727, 6728, 6729];
// const provider = new ethers.JsonRpcProvider("https://rpc.mintchain.io");

// const nftContractAddress = "0xF157ef41cD23a896fFeacC3dB694346E94BFCF10";
// const nftContractABI = [
//   "function totalSupply() view returns (uint256)",
//   "function ownerOf(uint256 tokenId) view returns (address)",
// ];

// const nftContract = new ethers.Contract(
//   nftContractAddress,
//   nftContractABI,
//   provider
// );

// const getNFTHolders = async () => {
//   const totalSupply = await nftContract.totalSupply();
//   const owners = {};

//   for (let tokenId = 10000; tokenId < 10005; tokenId++) {
//     try {
//       console.log(tokenId);
//       const owner = await nftContract.ownerOf(tokenId);
//       if (owners[owner]) {
//         owners[owner]++;
//       } else {
//         owners[owner] = 1;
//       }
//     } catch (error) {
//       console.error(`Error fetching owner of token ID ${tokenId}:`, error);
//     }
//   }

//   const ownerList = Object.keys(owners).map((owner) => ({
//     owner,
//     tokenCount: owners[owner],
//   }));

//   return ownerList;
// };
//@ts-ignore
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Parse the JSON data
      const nftHolders = JSON.parse(JSON.stringify(data));
      const skipIds = [5326, 5727, 6728, 6729];
      //@ts-ignore
      function distributeNftIds(holders, startId, skipIds) {
        let currentId = startId;
        //@ts-ignore
        const distributedHolders = holders.map((holder) => {
          const holderTokenIds = [];
          for (let i = 0; i < holder.tokenCount; i++) {
            while (skipIds.includes(currentId)) {
              currentId++;
            }
            holderTokenIds.push(currentId);
            currentId++;
          }
          return {
            ...holder,
            tokens: holderTokenIds,
          };
        });
        return distributedHolders;
      }

      const updatedHolders = distributeNftIds(nftHolders, 5000, skipIds);

      const filePath = path.join(process.cwd(), "nftDistribution.json");
      fs.writeFile(filePath, JSON.stringify(updatedHolders, null, 2), (err) => {
        if (err) throw err;
        console.log("Data saved to nft_holders.json");
      });
      //   const totalTokenCount = jsonArray.reduce((total, item) => {
      //     return total + item.tokenCount;
      //   }, 0);

      //   console.log("Total token count:", totalTokenCount);
      //   // Create a dictionary to track token counts for each owner
      //   const ownerTokenCounts = {};

      //   // Iterate through the JSON array
      //   jsonArray.forEach((item) => {
      //     const { owner, tokenCount } = item;

      //     // If the owner is already in the dictionary, add to their token count
      //     if (ownerTokenCounts[owner]) {
      //       ownerTokenCounts[owner] += tokenCount;
      //     } else {
      //       // Otherwise, add the owner to the dictionary
      //       ownerTokenCounts[owner] = tokenCount;
      //     }
      //   });

      //   // Convert the dictionary back into a JSON array
      //   const consolidatedArray = Object.keys(ownerTokenCounts).map((owner) => ({
      //     owner,
      //     tokenCount: ownerTokenCounts[owner],
      //   }));

      //   // Write the new JSON array to a file

      //   const filePath = path.join(process.cwd(), "public", "TotalHolders.json");
      //   console.log("saving");
      //   fs.writeFileSync(
      //     filePath,
      //     JSON.stringify(consolidatedArray, null, 2),
      //     "utf-8"
      //   );
      //   res
      //     .status(200)
      //     .json({ message: "NFT Holders saved successfully", filePath });
    } catch (error) {
      console.error("Error saving NFT holders to file:", error);
      res.status(500).json({ error: "Error saving NFT holders to file" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
// {
//     "owner": "0xBA221B271dfF3f7B2b9495c00e88cba2d145236C",
//     "tokenCount": 6630
//   },
