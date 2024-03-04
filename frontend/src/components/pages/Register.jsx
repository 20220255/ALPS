import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Card from "../shared/Card";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    isAdmin: false,
  });

  const { name, lastName, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

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

    if (password !== password2) {
      toast.error("Passwords do not match!");
    } else {
      const userData = {
        name,
        lastName,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <Card>
        <form onSubmit={onSubmit}>
          <h2>Customer Profile</h2>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={onChange}
                  //   placeholder="Enter your name"
                  name="name"
                  autoFocus
                  required
                />
              </div>
            </div>
          </div>
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="lastName">Last Name: </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                  //   placeholder="Enter your last name"
                  name="lastName"
                />
              </div>
            </div>
          </div>
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
          <div className="padding-b-12">
            <div className="input-group">
              <div>
                <label htmlFor="password2">Confirm password: </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  value={password2}
                  onChange={onChange}
                  //   placeholder="Confirm password"
                  name="password2"
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

export default Register;
