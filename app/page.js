import { getExperiences } from "./utils/api";
import HomePage from "./views/homePage";

export default async function Home({ searchParams }) {
  let experiences = await getExperiences();

  return (
    <main>
      <HomePage searchParams={searchParams} experiences={experiences} />
    </main>
  );
}
