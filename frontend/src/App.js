import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import AboutPage from "./components/pages/AboutPage";
import { LoyaltyAppProvider } from "./context/LoyaltyAppContext";
import AboutIconLink from "./components/AboutIconLink";
import CustomerPage from "./components/pages/CustomerPage";
import UpdateCustomerPage from "./components/pages/UpdateCustomerPage";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Error from "./components/pages/Error";
import ProtectedRoute from "./utils/ProtectedRoute";
import ErrorBoundary from "./utils/ErrorBoundary";
import { PointsProvider } from "./context/PointsContext";
import PointsCustomer from "./components/pages/PointsCustomer";
import AddPoints from "./components/pages/AddPoints";
import PointsRefCustomer from "./components/pages/PointsRefCustomer";
import EditPointsPage from "./components/pages/EditPointsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <PointsProvider>
          <LoyaltyAppProvider>
            <Header />
            <div className="container">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/main" element={<ProtectedRoute />}>
                    <Route exact path="/main" element={<Main />} />
                  </Route>
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/customer" element={<ProtectedRoute />}>
                    <Route path="/customer" element={<CustomerPage />} />
                  </Route>
                  <Route path="/points/:refId/:refID" element={<ProtectedRoute />}>
                    <Route path="/points/:refId/:refID" element={<PointsCustomer />} />
                  </Route>
                  <Route path="/points-maintenance/:refID/:refId" element={<ProtectedRoute />}>
                    <Route path="/points-maintenance/:refID/:refId" element={<AddPoints />} />
                  </Route>
                  <Route path="/refId/:userId" element={<ProtectedRoute />}>
                    <Route path="/refId/:userId" element={<PointsRefCustomer />} />
                  </Route>

                  <Route
                    path="/update-customer/:id"
                    element={<ProtectedRoute />}
                  >
                    <Route
                      path="/update-customer/:id"
                      element={<UpdateCustomerPage />}
                    ></Route>
                  </Route>
                  <Route
                    exact path="/edit-points/:_id/:refId" 
                    element={<ProtectedRoute />}
                  >
                    <Route
                      exact path="/edit-points/:_id/:refId" 
                      element={<EditPointsPage />}
                    ></Route>
                  </Route>

                  <Route
                    path="*"
                    element={
                      <Error
                        errMsg={{ statusText: "Page not found", status: "404" }}
                      />
                    }
                  />
                </Routes>
              </ErrorBoundary>
              <AboutIconLink />
            </div>
          </LoyaltyAppProvider>
        </PointsProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
