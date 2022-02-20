import BlogLayout from '@/components/BlogLayout'
import Container from '@/components/Container'
import BlogPostFilter from '@/components/BlogPostFilter'

import { breadcrumb, blog } from '@/data/content'
import { PostProps } from '@/components/BlogPost'
import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'


export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await prisma.post.findMany({
      where: { published: true },
    })
    return { props: { feed: JSON.parse(JSON.stringify(feed)), data: blog } }
  } catch {
    return { props: { feed: [] } }
  }
}

type Props = {
  data: any
  feed: PostProps[]
}

const Blog: React.FC<Props> = ({ data, feed }) => {
  
  return (
    <Container title={data.meta.title} description={data.meta.description}>
      <BlogLayout>
        <div className="blog">

          <h1 className="blogHeading breadcrumbs" aria-label={blog.heading}>
            {blog.heading}
          </h1>

          <BlogPostFilter feed={feed} />

        </div>
      </BlogLayout>
    </Container>
  )
}

export default Blog