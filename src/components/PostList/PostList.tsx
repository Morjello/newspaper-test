import { FC} from "react"
import { PostListProps } from "../../types/posts"
import PostItem from "../PostItem/PostItem"
import styles from './PostList.module.css'

const PostList: FC<PostListProps> = ({posts, currentPage, onClickPost, setFetching}) => {
  
  const toShowButton = () => {
    if (currentPage >= 7 && currentPage !== 11) return (
      <button className={styles.postListButton} onClick={() => setFetching(true)}>Загрузить еще</button>
    );
    if (currentPage === 11) return (
      <h2>Вы посмотрели все посты, замечательного дня!</h2>
    )
  }

  return (
    <div className={styles.postList}>
      <div className={styles.postListTable}>
        {posts.map(post => <PostItem key={post.id} post={post} onClickPost={onClickPost}/>)}
      </div>
      {toShowButton()}
    </div>
    
  )
}

export default PostList