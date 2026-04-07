import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./features/authentication/AuthContext";
import { InterviewProvider } from "./features/interview/InterviewContext";
const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router}></RouterProvider>
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
