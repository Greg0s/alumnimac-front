import HomePage from "./views/homePage";

export default function Home({ searchParams }) {
  return (
    <main>
      <HomePage searchParams={searchParams} />
    </main>
  );
}
