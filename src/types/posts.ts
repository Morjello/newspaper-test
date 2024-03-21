export interface IPostItem {
  id: number;
  title: string;
  body: string
}

export interface PostListProps {
  posts: IPostItem[];
  currentPage: number;
  onClickPost: (post: IPostItem) => void;
  setFetching: (fetching: boolean) => void;
}

export interface PostItemProps {
  post: IPostItem;
  onClickPost: (post: IPostItem) => void;
}

export interface PostPageProps {
  currentPost: IPostItem | null;
}