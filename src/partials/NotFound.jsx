const NotFound = () => {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <h1 className="text-6xl font-extrabold text-yellow-400">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-300">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition-colors duration-300"
        >
          Go Back Home
        </a>
      </div>
    );
  };
  
  export default NotFound;
  