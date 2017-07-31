import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> My To Do List </h4>
    There are { props.items.length } items.
    <ul onDragOver={props.dragOver}>
    { props.items.tasks.map((item, i) => {
        var dragging = (i === props.items.dragging) ? 'dragging' : '';
        console.log('dragging', dragging);
        return (
            <ListItem dataId={i}
            dragging={dragging}
            key={item.id}
            item={item}
            removeToDo={props.removeToDo}
            dragEnd={props.dragEnd}
            dragStart={props.dragStart}
            />
        );
    }, this)}
    </ul>
  </div>
);

export default List;
