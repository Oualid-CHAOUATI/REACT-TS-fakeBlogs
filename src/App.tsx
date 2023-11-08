import { ReactNode, useEffect, useState } from "react";
import { get } from "./utils/http";
import BlogPosts, { TBlogPost } from "./components/BlogPosts";

import img from "./assets/data-fetching.png";
import { Navigation } from "./components/Navigation";
type TRawBlogPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
type TLoading_Error = {
  loading: boolean;
  error: null | string;
};

const MAX_TO_VIEW = 8;
function App() {
  const [blogPosts, setBlogPosts] = useState<TBlogPost[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);

  const [loading_Error_state, setLoading_Error_state] =
    useState<TLoading_Error>({
      loading: false,
      error: null,
    });

  const postsTotal = blogPosts.length;
  const pagesTotal = Math.ceil(postsTotal / MAX_TO_VIEW);

  const showNewtPage = () => {
    if (currentPage < pagesTotal) setCurrentPage((p) => p + 1);
  };

  const showPrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  useEffect(() => {
    async function getData() {
      setLoading_Error_state((state) => ({
        ...state,
        loading: true,
        error: null,
      }));

      try {
        const data = await getRawBlogs();

        const blogPosts = rawBlogstoBlogs_posts(data);
        // setData(blogPosts.slice(0, NUMBER_TO_VIEW));
        setLoading_Error_state((state) => ({
          ...state,
          loading: false,
          error: null,
        }));
        setBlogPosts([...blogPosts]);
      } catch (e) {
        setLoading_Error_state((state) => ({
          ...state,
          loading: false,
          error: (e as Error).message,
        }));
      }
    }

    getData();
  }, []);

  let Content: ReactNode;

  if (loading_Error_state.loading) Content = <p>Loading...</p>;
  else if (loading_Error_state.error)
    Content = (
      <p>
        An error occured <br />
        <span style={{ background: "red", color: "#fff" }}>
          {loading_Error_state.error}
        </span>
      </p>
    );
  else {
    const postsToView = blogPosts.slice(
      (currentPage - 1) * MAX_TO_VIEW,
      MAX_TO_VIEW * currentPage
    );
    Content = <BlogPosts posts={postsToView} />;
  }
  return (
    <main>
      <img src={img} alt="img..." />
      {Content}

      <Navigation
        currentPage={currentPage}
        pagesTotal={pagesTotal}
        showNextPage={showNewtPage}
        showPrevPage={showPrevPage}
        hide={
          Boolean(loading_Error_state.error) ||
          loading_Error_state.loading ||
          pagesTotal === 0
        }
      />
    </main>
  );
}

export default App;

function rawBlogstoBlogs_posts(arr: TRawBlogPost[]): readonly TBlogPost[] {
  return arr.map((post: TRawBlogPost) => {
    return {
      id: post.id,
      title: post.title,
      text: post.body,
    };
  });
}

async function getRawBlogs(): Promise<TRawBlogPost[]> {
  const data = (await get(
    "https://jsonplaceholder.typicode.com/posts"
  )) as TRawBlogPost[];
  return data;
}
