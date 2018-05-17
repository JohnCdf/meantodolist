import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  componentWillMount(){
    localStorage.rudetodo ?
    console.log( localStorage.rudetodo ) : window.location = '/account/signin'

    /*axios.get('/user?')
    .then()
    .catch()*/
    let dateObj = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    
    let newdate = months[dateObj.getMonth()] + " " + day + ", " + year;
    this.setState({
      date: newdate
    });
  }
  constructor(props){
    super(props);
    this.state = {
      date: null
    };
  };
  render(){
    return(
      <div className="container">
        <h1 className="title">Rude Todo</h1>
        <hr/>
        {this.state.date}
        
        <div className="list">

        </div>
      </div>  
    )
  }
};

export default App;