import React from "react";
import Card from "../components/shared/Card";
import { Link, useNavigate } from "react-router-dom";
import FallbackUi from "./FallbackUi";



class ErrorBoundary extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  

  render()  {
    
    if (this.state.hasError) {
      return (
        <FallbackUi />
        // <Card>
        
        //   <h1>Something went wrong. Please try again later.</h1>;
        //   <h3><Link to='/main'><span>Go back to main page</span></Link></h3>
        //   {/* <h2><a href="http://localhost:3000/main">Go back to main page</a></h2> */}
        // </Card>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
