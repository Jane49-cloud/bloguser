const NotFoundPage = () => {
  return (
    <div className="container text-center">
      <h1 className="display-1">404</h1>
      <h2 className="display-4">Page Not Found</h2>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <p className="mt-4">
        Go back to{" "}
        <a href="/" className="text-decoration-none">
          Home
        </a>
      </p>
    </div>
  );
};

export default NotFoundPage;
