import { Routes, Route, Navigate } from "react-router-dom";
import Deshboard from "./components/Deshboard";
import MathExpretion from "./components/MathExpretion";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import { isLoggedIn } from "./lib/api";

// Only signed-in players can open the dashboard and the game.
const Private = ({ children }) => (isLoggedIn() ? children : <Navigate to="/signin" replace />);
// Signed-in players skip the sign in / sign up pages.
const Guest = ({ children }) => (isLoggedIn() ? <Navigate to="/home" replace /> : children);

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Guest><SignUp /></Guest>} />
      <Route path="/signin" element={<Guest><SignIn /></Guest>} />
      <Route path="/home" element={<Private><Deshboard /></Private>} />
      <Route path="/math-game" element={<Private><MathExpretion /></Private>} />
      <Route path="*" element={<Navigate to={isLoggedIn() ? "/home" : "/signup"} replace />} />
    </Routes>
  );
}

export default App;
