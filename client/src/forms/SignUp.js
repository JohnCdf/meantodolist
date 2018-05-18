import React, {Component} from 'react';
import axios from 'axios';

class SignUp extends Component {
  onSubmit(event){
    event.preventDefault();

    let form = event.target;
    let formElements = form.elements; 

   let data = {} 

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].type !== 'submit') {
      let currentField = formElements[i];
      data[currentField.id] = currentField.value;
    }
  }
console.log(data)
  axios.post('/api/user',data)
  .then ( function (response) {
    console.log(response.data)
  })
  .catch( function (error) {
    var formDisplay = document.querySelector("#" + form.id + ' .formDisplay');
      var errorResponse = JSON.parse(error.request.response);
      formDisplay.innerHTML = errorResponse.message
  })
  }
  render(){
    return(
      <div>
  <h1 className="title">Sign Up</h1>
  <hr/>
  <form id="signup" method="POST" action="/api/users" onSubmit={this.onSubmit}>
  <p className="formDisplay"></p>
    <div className="form-group">
      <label>Username</label>
      <input id="username" type="text" className="form-control" placeholder="Username"/>
    </div>
    
    <div className="form-group">
      <label>Email</label>
      <input id="email" type="email" className="form-control" placeholder="Email (Dont worry, we hate spam too)"/>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input id="password" type="password" className="form-control" placeholder="******"/>
    </div>

    <button className="btn btn-danger">Sign Up</button>
  </form>

  <a href="/account/signin">Already have an account?</a>
</div>
    )
  }
}

export default SignUp;