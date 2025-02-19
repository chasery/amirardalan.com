import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import calculateReadTime from '@/utils/calculateReadTime'


const Post = ({ post }) => {

  const publishDate = formatDate(post.publishedAt)
  const postReadTime = calculateReadTime(post.content)

  return (
    <div className="blog postTeaser">
      <h2>
        <Link
          href={`/blog/${post.slug}`}
          aria-label={post.title}
        >
          {post.title}
        </Link>
      </h2>
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}>
          <div className="postDetails">
            {publishDate} • {postReadTime}
          </div>
        </div>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post