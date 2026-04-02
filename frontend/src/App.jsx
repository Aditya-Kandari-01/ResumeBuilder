import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./features/authentication/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
};

export default App;
