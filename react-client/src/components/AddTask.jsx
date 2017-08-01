import React from 'react';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    event.preventDefault();
  }

  addToList(e) {
    e.preventDefault();
    this.props.addToDo(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <form>
        <input style={{ width: '90%', background: 'black', color: 'grey', borderWidth: 0.5, borderRadius: 5, padding: 5, borderColor: 'silver', borderStyle: 'solid', marginBottom: 5 }} type="text" placeholder="add task here..." value={this.state.value} onChange={this.handleChange.bind(this)} />
        <button style={{ background: 'black', color: 'grey', borderRadius: 5}} onClick={this.addToList.bind(this)}>Add</button>
      </form>
    );
  }

}

export default AddTask;
