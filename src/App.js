import Index from "./components/getData/getDataServers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GetDataDetails from "./components/getData/getDataDetails";
import Login from "./components/login/Login";
import { ProtectedRoute } from "./components/login/ProtectedRoute";
import { AuthProvider } from "./components/login/AuthContext";
import { Register } from "./components/login/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/server/details/:iditem"
            element={
              <ProtectedRoute>
                <GetDataDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
