import "./App.scss";
// @ts-ignore
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 md:px-0">
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </main>
    </>
  );
}

export default App;
