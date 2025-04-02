import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/formcomponents';
import UserDashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
