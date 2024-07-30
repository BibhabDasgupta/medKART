import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='notFound'
    style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/notfoundBackGround.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'
    }}
    >
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button  onClick={() => window.location.href = './'} id='home'> Back to Home Page</button>
    </div>
  );
}

export default NotFound;