import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> My To Do List </h4>
    There are { props.items.length } items.
    <ul onDragOver={props.handleDragOver}>
    { props.items.map((item, i) => <ListItem dataId={i} key={item.id} item={item} removeToDo={props.removeToDo} handleDragStart={props.handleDragStart} handleDragEnd={props.handleDragEnd}/>)}
    </ul>
  </div>
);

export default List;