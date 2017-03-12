
import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDragStart (e) {
    console.log('drag is starting');
  }
  handleDragOver(e) {
    e.preventDefault();
    console.log('drag is over');
  }
  handleDrop(e) {
    e.preventDefault();
    console.log('something has been dropped');
  }

  render () {
    return (
        <div draggable="true" onDragStart={this.handleDragStart.bind(this)} onDragEnd={this.handleDragOver.bind(this)} onDrop={this.handleDrop.bind(this)} style={{cursor: 'move', borderWidth: 0.5, borderRadius: 5, padding: 5, borderColor: 'black', borderStyle: 'solid', marginBottom: 5}}>{ this.props.item.content}
            <button style={{position: 'absolute', right: 0}} onClick ={() => { this.props.removeToDo(this.props.item); }}>X</button>
        </div>
    );
  }
}

export default ListItem;