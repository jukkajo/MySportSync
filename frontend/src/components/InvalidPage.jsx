import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const InvalidPage = ({
  errorText = "This page is not available",
  redirectPath = "/", 
  title = "Sorry",
  subtitle = "The link you followed may be broken, or the page may not exist at the moment.",
  hideRedirectMessage = false,
  buttonText = "Click to return",
  customContent = null, // Full JSX override
}) => {
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (countdown === 0) {
      setRedirect(true);
    } else {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  if (redirect) {
    return <Navigate to={redirectPath} />;
  }

  const getColor = (count) => {
    if (count <= 5) return "text-red-500";
    if (count <= 10) return "text-yellow-500";
    return "text-blue-600";
  };

  // Full override mode
  if (customContent) {
    return <>{customContent}</>;
  }

  return (
    <div className="bg-primary flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl text-white font-bold mb-2">{title}</h1>
      <p className="text-lg my-1 text-white">{errorText}</p>
      {subtitle && <p className="text-sm text-white my-4">{subtitle}</p>}

      {!hideRedirectMessage && (
        <p className="text-sm text-white mb-4">
          Redirecting in
          <span className={`font-bold ${getColor(countdown)}`}> {countdown} </span>
          second{countdown !== 1 ? 's' : ''}...
        </p>
      )}

      <button
        onClick={() => setRedirect(true)}
        className="cursor-pointer text-green-400 underline hover:text-green-600 focus:outline-none"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InvalidPage;

