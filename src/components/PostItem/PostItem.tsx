import { FC } from "react"
import { PostItemProps } from "../../types/posts"
import styles from './PostItem.module.css'
import { Link } from "react-router-dom"

const PostItem: FC<PostItemProps> = ({post, onClickPost}) => {
  return (
    <Link 
      to={`/post/${post.id}`} 
      className={styles.postItem} 
      onClick={() => onClickPost(post)}
    >
      <h3>{post.id}</h3>
      <div className={styles.postItemContainer}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </Link>
  )
};

export default PostItem;