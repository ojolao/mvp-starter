import React from 'react';

const ListItem = (props) => (
  <div style={{borderWidth: 0.5, borderRadius: 5, padding: 5, borderColor: 'black', borderStyle: 'solid', marginBottom: 5}}>
    { props.item.content} <button style={{position: 'absolute', right: 0}} onClick ={() => { props.removeToDo(props.item); }}>X</button>
  </div>
);

export default ListItem;