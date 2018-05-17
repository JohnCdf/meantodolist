import React, {Component} from 'react';
import axios from 'axios';

class SignIn extends Component {
  onSubmit(event){
    event.preventDefault();

    let form = event.target;
    let formElements = form.elements;

    let headers = {}
    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].type != 'submit') {
        let currentField = formElements[i];
        headers[currentField.id] = currentField.value;
      }
    }

    axios.get('/api/user', {
      headers: headers
    })
    .then (function(response){
      let formDisplay = document.querySelector("#" + form.id + ' .formDisplay');
      formDisplay.innerHTML = 'Logging In'
      formDisplay.style.color = 'white'
    })
    .catch(function(error){
      var formDisplay = document.querySelector("#" + form.id + ' .formDisplay');
      var errorResponse = JSON.parse(error.request.response);
      formDisplay.innerHTML = errorResponse.message
    })
  }
  constructor(props){
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  };
render(){
return(
<div>
  <h1 className="title">Sign In</h1>
  <hr/>
  <form id="signin" method="GET" action="/api/users" onSubmit={this.onSubmit}>
  <p className="formDisplay"></p>

    <div className="form-group">
      <label htmlFor="name" >Username</label>
      <input type="text" id="username" className="form-control" placeholder="Username"/>
    </div>
    
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" id="password" className="form-control" placeholder="******"/>
    </div>

    <button className="btn btn-danger">Sign In</button>
  </form>

  <a href="/account/signup">No account? No problem.</a>
</div>
);
}
};

export default SignIn;