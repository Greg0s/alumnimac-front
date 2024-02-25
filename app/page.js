import { getExperiences } from "./utils";
import { HomePage } from "@/views/";

export default async function Home({ searchParams }) {
  let experiences = await getExperiences();

  return (
    <main>
      <HomePage searchParams={searchParams} experiences={experiences} />
    </main>
  );
}
