import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className="list">
    <p style={{ padding: 5, marginBottom: 0 }}> { props.items.tasks.length } items </p>
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
