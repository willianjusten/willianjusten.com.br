import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { Posts } from "@/app/_components/posts";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <Header />
        <Posts posts={allPosts} />
      </Container>
    </main>
  );
}
