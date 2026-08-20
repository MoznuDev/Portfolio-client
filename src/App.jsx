
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import "./App.css"; 

function App() {
  return (
    <div className="app-container">
      {/* <Navbar /> */}
      
      {/* Outlet এর জায়গায় Home বা চাইল্ড রুটগুলো রেন্ডার হবে */}
      <Navbar/>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;