import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> My To Do List </h4>
    There are { props.items.tasks.length } items.
    <ol>
    { props.items.tasks.map((item, i) => {
        var dragging = (i === props.items.dragging) ? 'dragging' : '';
        return (
            <ListItem dataId={i}
            dragging={dragging}
            key={item.id}
            item={item}
            removeToDo={props.removeToDo}
            dragEnd={props.dragEnd}
            dragOver={props.dragOver}
            dragStart={props.dragStart}
            />
        );
    }, this)}
    </ol>
  </div>
);

export default List;
