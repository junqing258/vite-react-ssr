import "./App.scss";
// @ts-ignore
import routes from "virtual:generated-pages-react";
import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Suspense } from "react";

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </main>
    </div>
  );
}

export default App;
