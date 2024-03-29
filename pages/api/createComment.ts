// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-ignore
import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);
// @ts-ignore
export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, email, name, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).send({ message: "Couldn't submit comment", err });
  } // @ts-ignore
  res.status(200).json({ message: "Comment submitted" });
}
