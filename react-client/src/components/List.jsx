import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> My To Do List </h4>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
);

export default List;