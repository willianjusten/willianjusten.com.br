import { Post } from "@/interfaces/post";
import { PostLink } from "./post-link";

type Props = {
  posts: Post[];
};

export function Posts({ posts }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostLink
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            description={post.description}
          />
        ))}
      </div>
    </section>
  );
}
