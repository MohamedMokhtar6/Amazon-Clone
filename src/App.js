import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOut from "./Components/CheakOut";
import Header from "./Components/Header";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";
import { useAuth } from "./Context/GlobalState";
import { auth } from "./Firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51MjjdoJTxl6Fbecb1RzH2iPBmB1dCXsikHapUDAHWXyap16cX12VkTowONAwBmUSVe73vCJA11lWwB5MNrUu33s100rezmahKu"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "Set_User", user: authUser });
      } else {
        dispatch({ type: "Set_User", user: null });
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route path="*" element={<h1>Page Not Found 404</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <CheckOut />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
