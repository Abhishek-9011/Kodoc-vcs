import { BrowserRouter, Routes,Route } from "react-router-dom";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import TextEditor from "./pages/user/Dashboard";
import Preview from "./pages/user/Preview";
function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/signin" element={<Signin></Signin>} />
        <Route path="/dashboard" element={<TextEditor/>} />
        <Route path="/preview" element={<Preview/>} />
      </Routes>
    </BrowserRouter>

  </>;
}

export default App;
