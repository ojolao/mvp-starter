import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import AddTask from './components/AddTask.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };
    this.getRequest = this.getRequest.bind(this);
    this.addToDo = this.addToDo.bind(this);
  }

  componentDidMount () {
    this.getRequest();
  }

  getRequest () {
    $.ajax({
      url: '/items', 
      success: (data) => {
        console.log('get request was successful', data);
        this.setState({
          items: data
        });
      },
      error: (err) => {
        console.log('err from get request', err);
      }
    });
  }

  addToDo (item) {
    console.log(`${item} was posted to server`);
    $.ajax({
      url: '/items/add',
      method: 'POST',
      data: {item: item},
      success: (data) => {
        console.log('post request was successful');
        console.log(this);
        this.getRequest();
      },
      error: (err) => {
        console.log('err from post request', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items}/>
      <AddTask addToDo={this.addToDo}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));