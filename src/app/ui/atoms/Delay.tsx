"use client"

import React, { useState, useEffect } from 'react';


export const Delay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // 30 seconds in milliseconds

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
       { isVisible && <span aria-busy="true"></span>} <span></span>
    </div>
  );
};
