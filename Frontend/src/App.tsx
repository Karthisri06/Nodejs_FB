import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/Formcomponents";
import UserDashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/Privateroute";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<AuthForm />} /> */}
        <Route path="/login" element={<AuthForm />} />
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
