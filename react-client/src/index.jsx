import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import AddTask from './components/AddTask.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: { tasks: [] },
    };
    this.getRequest = this.getRequest.bind(this);
    this.addToDo = this.addToDo.bind(this);
    this.removeToDo = this.removeToDo.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.sort = this.sort.bind(this);
    this.updateListAfterDrag = this.updateListAfterDrag.bind(this);

  }

  componentDidMount () {
    this.getRequest();
  }


  getRequest () {
    $.ajax({
      url: '/items', 
      success: (data) => {
        //console.log('get request was successful', data);
        const dataObj = { tasks: data };
        this.setState({
          items: dataObj
        });
      },
      error: (err) => {
        console.log('err from get request', err);
      },
    });
  }

  sort(tasks, dragging) {
    let data = this.state.items;
    data.tasks = tasks;
    data.dragging = dragging;
    this.setState({ items: data });
  }

  dragEnd() {
    this.sort(this.state.items.tasks, undefined);
    this.updateListAfterDrag(this.state.items.tasks);
  }

  dragStart(e) {
    this.dragged = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', null);
  }

  dragOver(e) {
    e.preventDefault();
    var over = e.target;
    var dragging = this.state.items.dragging;
    var from = isFinite(dragging) ? dragging : this.dragged;
    var to = Number(over.dataset.id);
    if ((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
    if (from < to) to--;

    // Move from 'a' to 'b'
    var items = this.state.items.tasks;
    items.splice(to, 0, items.splice(from, 1)[0]);
    this.sort(items, to);
  } 

  updateListAfterDrag (items) {
    $.ajax({
      url: '/items/update',
      method: 'POST',
      data: {items: items},
      success: (data) => {
        //console.log('post request to update items was successful');
      },
      error: (err) => {
        console.log('err from post request to update items', err);
      }
    });
  }

  addToDo (item) {
    $.ajax({
      url: '/items/add',
      method: 'POST',
      data: {item: item},
      success: (data) => {
        this.getRequest();
      },
      error: (err) => {
        console.log('err from post request', err);
      }
    });
  }

  removeToDo(item) {
    $.ajax({
      url: '/items/delete',
      method: 'DELETE',
      data: {item: item},
      success: (data) => {
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
      <List items={this.state.items} removeToDo={this.removeToDo} dragEnd={this.dragEnd} dragStart={this.dragStart} dragOver={this.dragOver} sort={this.sort} handleDragStart={this.handleDragStart} handleDragEnd={this.handleDragEnd} handleDragOver={this.handleDragOver}/>
      <AddTask addToDo={this.addToDo}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));