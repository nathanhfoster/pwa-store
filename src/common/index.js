import React, { useState } from 'react';


const Common = ({ children }) => {
  const [count, changeCount] = useState(0);

  return (
    <>
      <div>
        <h1>Main Navigation - Count ({count})</h1>
        <button onClick={() => changeCount(count+1)}>Click Me!</button>
      </div>
      {children}
    </>
  )
}


export default Common;
