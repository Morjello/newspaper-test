import { useEffect, useState } from 'react';
import { Route, Routes, useSearchParams} from 'react-router-dom';
import PostList from '../PostList/PostList';
import styles from './App.module.css'
import { IPostItem } from '../../types/posts';
import PostPage from '../PostPage/PostPage';

function App() {
  const [postList, setPostList] = useState<IPostItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [currentPost, setCurrentPost] = useState<IPostItem | null>(null);
  
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get('page') || '';
  const params = new URLSearchParams({_limit: `${limit}`, _page: `${ currentPage}`}).toString();
  
  useEffect(() => {
    fetchPosts()
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [currentPage]);
  
  const scrollHandler = (event: Event) => {
    const target = event.target as Document;
    if (target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) < 100
      && currentPage < 7) {
        setFetching(true);
      }
  };
  
  useEffect(() => {
    pageQuery.length && getPosts(pageQuery)
  }, []);

  const getPosts = async (page: string) => {
    const quantityPosts = Number(page) * limit;
    await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${quantityPosts}`)
      .then(response => response.json())
      .then((posts) => {
        setPostList([...postList, ...posts]);
        setCurrentPage(currentPage + Number(page))
        setSearchParams({page: page})
        }
      )
  };

  const fetchPosts = async () => { 
    try {
      if (fetching) {
       await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
        .then(response => response.json())
        .then((posts) => {
          setPostList([...postList, ...posts]);
          setCurrentPage(prevState => prevState + 1);
          setSearchParams({page: `${currentPage}`});
        })
      }
    } finally {  
      setFetching(false);
    }
  };

  const onClickPost = (post: IPostItem) => {
    setCurrentPost(post)
  };
  
  return (
    <div className={styles.app}>
      <div className={styles.appWrapper}>
        <Routes>
          <Route path='/' element={<PostList 
            posts={postList} 
            onClickPost={onClickPost} 
            currentPage={currentPage} 
            setFetching={setFetching}
            />}
          />
          <Route path='/post/:id' element={<PostPage currentPost={currentPost}/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
