import axios from "axios";

export default async function handler(req: any, res: any) {
  const { nftId } = req.query;
  const { data } = await axios.get(
    `https://bafybeiaefvjpb4d2pzgbsipomb52gmbtzk6ybxjr3fko34avdiusq457vq.ipfs.nftstorage.link/${nftId}.json`
  );

  res.status(200).json(data);
}
