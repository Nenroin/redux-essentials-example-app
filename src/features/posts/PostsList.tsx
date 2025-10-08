import { Link } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { PostsState, selectAllPosts } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'

export const PostsList = () => {
  const posts: PostsState = useAppSelector(selectAllPosts)
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((e) => (
    <article className="post-excerpt" key={e.id}>
      <h3>
        <Link to={`/posts/${e.id}`}>{e.title}</Link>
      </h3>
      <PostAuthor userId={e.userId} />
      <br />
      <TimeAgo timestamp={e.date} />
      <p className="post-content">{e.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
