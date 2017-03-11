import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> My To Do List </h4>
    There are { props.items.length } items.
    <ul>
    { props.items.map(item => <ListItem key={item.id} item={item} removeToDo={props.removeToDo}/>)}
    </ul>
  </div>
);

export default List;