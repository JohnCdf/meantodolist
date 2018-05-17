import React, {Component} from 'react';

class SignUp extends Component {
  render(){
    return(
      <div>
  <h1 className="title">Sign Up</h1>
  <hr/>
  <form method="POST" action="/api/users">
    <div className="form-group">
      <label>Name</label>
      <input type="text" className="form-control" placeholder="Name"/>
    </div>
    
    <div className="form-group">
      <label>Email</label>
      <input type="email" className="form-control" placeholder="Email (Dont worry, we hate spam too)"/>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type="password" className="form-control" placeholder="******"/>
    </div>

    <button className="btn btn-danger">Sign Up</button>
  </form>

  <a href="/account/signin">Already have an account?</a>
</div>
    )
  }
}

export default SignUp;