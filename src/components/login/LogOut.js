import { useAuth } from "./AuthContext";

export const LogOut = () => {
    const { logout, user } = useAuth();

    console.log(user);
    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error.message);
      }
    };
  return (
    <button onClick={handleLogout} type="button" className="btn btn-outline-danger">
      Cerrar sesión
    </button>
  );
};
