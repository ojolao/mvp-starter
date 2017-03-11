import React from 'react';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  addToList() {
    this.props.addToDo(this.state.value);
    this.setState({value: ''});
  }

  render () {
    return (
      <div>
        <h2> Add Item </h2>
            <input type = "text" placeholder = "add task here..." value={this.state.value} onChange={this.handleChange.bind(this)}/>
            <button onClick={this.addToList.bind(this)}>Add</button>
      </div>
    );
  }

}

export default AddTask;
