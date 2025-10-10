import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectCurrentUserId } from '@/features/auth/authSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = postId ? useAppSelector((state) => selectPostById(state, postId)) : undefined

  const currentUserId = useAppSelector(selectCurrentUserId)!

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const canEdit = currentUserId === post.id

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <ReactionButtons post={post} />
        <PostAuthor userId={post.userId} />
        <br />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  )
}
