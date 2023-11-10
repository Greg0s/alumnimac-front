import ExperienceList from "./views/experiencesList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading</p>}>
        <ExperienceList />
      </Suspense>
    </main>
  );
}
