import React from "react";

function FallbackUi() {
  
  return (
<div>
      <h1>Something went wrong</h1>
      <a href={`/main`}> <span>Go back to main page</span></a>  
    </div>
  )
    
  
}

export default FallbackUi;
