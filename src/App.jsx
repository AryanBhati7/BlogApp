import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import Header from "./components/index";
import Footer from "./components/index";
import conf from "./conf/conf";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen bg-slate-600 text-white text-3xl text-center">
        Logged In {conf.appwriteURL}
      </div>
      <Header />
      <Footer />
    </>
  ) : (
    <div>Not logged in</div>
  );
}

export default App;
