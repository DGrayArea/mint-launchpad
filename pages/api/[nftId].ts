import axios from "axios";

export default async function handler(req: any, res: any) {
  const { nftId } = req.query;
  const { data } = await axios.get(
    `https://ipfs.io/ipfs/QmdfpHyHWo5s7LDPfzv2CQkdx9KBzE28uMMDCQxEWegm8K/${nftId}.json`
  );

  res.status(200).json(data);
}
