import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/formcomponents";
import UserDashboard from "./components/dashboard";
import PrivateRoute from "./components/privateroute";

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
