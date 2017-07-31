
import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
        <li draggable="true" className={this.props.dragging} data-id={this.props.dataId}onDragStart={this.props.dragStart} onDragOver={this.props.dragOver} onDragEnd={this.props.dragEnd} style={{cursor: 'move', borderWidth: 0.5, borderRadius: 5, padding: 5, borderColor: 'black', borderStyle: 'solid', marginBottom: 5}}>{ this.props.item.content}
            <button style={{position: 'absolute', right: 0}} onClick ={() => { this.props.removeToDo(this.props.item); }}>X</button>
        </li>
    );
  }
}

export default ListItem;