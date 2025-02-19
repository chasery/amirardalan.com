import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'


// POST /api/update
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content, slug, teaser, category } = req.body

  const result = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      slug: slug,
      teaser: teaser,
      category: category,
    },
  })
  res.json(result)
}