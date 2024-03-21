import { FC } from "react"
import { PostPageProps } from "../../types/posts"
import styles from './PostPage.module.css'

const PostPage: FC<PostPageProps> = ({currentPost}) => {
  return (
    <div className={styles.postPage}>
      {currentPost !== null && (
        <>
        <h3>{currentPost.id}</h3>
        <div className={styles.postPageContainer}>
          <h3 >{currentPost.title}</h3>
          <p>{currentPost.body}</p>
        </div>
        </>
      )}
    </div>
  )
}

export default PostPage