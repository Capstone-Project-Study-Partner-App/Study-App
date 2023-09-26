

export default function Home() {
    return (
      <div className="home-container">
        <div className="home-image">
          <img
            src="https://i.pinimg.com/1200x/35/a0/d9/35a0d99126faaca0d33305bd1a86ee20.jpg"
            alt="Placeholder Image"
            style={{width: '500px'}}
          />
        </div>
  
        <div className="login-form">
          <h1>Login</h1>
          <form action="">
            <label htmlFor="username">Username</label>
            <input type="text" />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" />
            <br />
            <input type="checkbox" />
            <label>Remember Me</label>
            <br />
            <a href="#">Forgot Password?</a>
            <br />
            <button type="submit">Login</button>
            <br />
          </form>
          <a href="#">Sign up Here</a>
        </div>
      </div>
    );
  }