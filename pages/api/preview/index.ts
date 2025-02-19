import { NextApiRequest, NextApiResponse } from 'next'

// PREVIEW MODE /api/preview/index
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.query.secret !== `${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}` || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({})
  const slug = req.query.slug
  
  res.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`)
}