function Login() {

  const handleGoogleLogin = () => {
    window.open("http://localhost:4000/api/v1/user/googleOAuth", "_self");
  };

  const handleGitHubLogin = () => {
    window.open("http://localhost:4000/api/v1/user/githubOAuth", "_self");
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
      
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default Login;
