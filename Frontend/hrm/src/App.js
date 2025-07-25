import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import ForgetPassword from './Authentication/ForgetPassword';
import User from './Administrator/User';
import RolesAndPermission from './Administrator/RolesAndPermission';
import AdminDashboard from './Dashboard/AdminDashboard';
import AdminLayout from './Layout/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Admin Routes (Wrapped with layout) */}
        <Route
          path="/adminDashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/roleandpermission"
          element={
            <AdminLayout>
              <RolesAndPermission />
            </AdminLayout>
          }
        />
        <Route
          path="/user"
          element={
            <AdminLayout>
              <User />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
