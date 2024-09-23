import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
    <div class="container">
      <Header />
      <div class="content">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
