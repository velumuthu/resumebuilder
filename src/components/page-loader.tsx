'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const PageLoader = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 bg-primary transition-all duration-500 ${loading ? 'w-full' : 'w-0'}`}>
    </div>
  );
};

export default PageLoader;