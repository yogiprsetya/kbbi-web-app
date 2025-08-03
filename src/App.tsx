import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Letter from "./pages/Letter";
import Word from "./pages/Word";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:letter" element={<Letter />} />
          <Route path="/:letter/:word" element={<Word />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
