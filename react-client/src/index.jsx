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
    this.removeToDo = this.removeToDo.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    //this.getPlaceholder = this.getPlaceholder.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    //this.handleDrop = this.handleDrop.bind(this);
    this.updateListAfterDrag = this.updateListAfterDrag.bind(this);

  }

  componentDidMount () {
    this.getRequest();
  }

  getPlaceholder() {
    if (!this.placeholder) {
      this.placeholder = document.createElement('li');
    }
    return this.placeholder;
  }

  handleDragStart (e) {
    console.log('drag is starting');
    console.log('drag start e.', e.currentTarget);
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  }

  handleDragEnd(e) {
    e.preventDefault();
    console.log('drag is over');
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(this.getPlaceholder());
    var data = this.state.items;
    var dragFrom = Number(this.dragged.dataset.id);
    var dragTo = Number(this.over.dataset.id);
    console.log('dragFrom, dragTo', dragFrom, dragTo);
    if (dragFrom < dragTo ) { dragTo--; }
    if (this.nodePlacement === 'after') { dragTo++; }
    console.log('data before splice', data);
    data.splice(dragTo, 0, data.splice(dragFrom, 1)[0]);
    console.log('data after splice', data);
    this.setState({items: data});
    console.log('data to be sent to server', this.state.items);
    this.updateListAfterDrag(this.state.items);
  }

  handleDragOver(e) {
    e.preventDefault();
    this.dragged.style.display = 'none';
    this.over = e.target;
    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if (relY > height) {
      this.nodePlacement = 'after';
      parent.insertBefore(this.getPlaceholder(), e.target.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = 'before';
      parent.insertBefore(this.getPlaceholder(), e.target);
    }
    console.log('handleDragOver has ended');
  }

  handleDrop(e) {
    e.preventDefault();
    console.log('something has been dropped');
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

  updateListAfterDrag (items) {
    console.log(`${items} was posted to server`);
    $.ajax({
      url: '/items/update',
      method: 'POST',
      data: {items: items},
      success: (data) => {
        console.log('post request to update items was successful');
      },
      error: (err) => {
        console.log('err from post request to update items', err);
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
        this.getRequest();
      },
      error: (err) => {
        console.log('err from post request', err);
      }
    });
  }

  removeToDo(item) {
    console.log(`${item} was sent to server for deletion`);
    $.ajax({
      url: '/items/delete',
      method: 'DELETE',
      data: {item: item},
      success: (data) => {
        console.log('delete request was successful');
        this.getRequest();
      },
      error: (err) => {
        console.log('err from delete request', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items} removeToDo={this.removeToDo} handleDragStart={this.handleDragStart} handleDragEnd={this.handleDragEnd} handleDragOver={this.handleDragOver}/>
      <AddTask addToDo={this.addToDo}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));