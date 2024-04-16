import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import Card from "../shared/Card";
import { login, reset } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";
import {toast} from 'react-toastify'
import { useEffect } from "react";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, message, isError} = useSelector((state) => {
    return state.auth
  })

  useEffect(() => {
    if (isError) {
        toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
        navigate('/main')
    }

    dispatch(reset())
  },[dispatch, isError, isSuccess, message, navigate, user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
        email,
        password
    }
    
    dispatch(login(userData))
    
  };


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Log In
        </h1>
        <p>Sign in to check your points</p>
      </section>

      <Card>
        <form onSubmit={onSubmit}>
          <h2>Enter Credentials</h2>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={onChange}
                  //   placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>
            </div>
          </div>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={onChange}
                  //   placeholder="Enter your password"
                  name="password"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default Login;
