import Contact from './components/Contact'
import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {backendResponse:""};
  }
  callBackend(){
    fetch("http://localhost:9000/testBackend")
      .then(res => res.text())
      .then(res => this.setState({backendResponse: res}));
  }
  componentWillMount(){
    this.callBackend();
  }
  render() {
    return (
      <div>
        <p>{this.state.backendResponse}</p>
        <Contact/>
      </div>
    )
  }
}


// function App() {
//   return (
//     <div>
//       <Contact/>
//     </div>
//   );
// }

export default App;
