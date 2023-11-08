export type TBlogPost = {
  id: number;
  title: string;
  text: string;
};

type BlogPostsProps = {
  posts: TBlogPost[];
};

export default function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div id="blog-posts">
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
