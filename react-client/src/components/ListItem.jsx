import React from 'react';

const ListItem = (props) => (
  <div style={{borderWidth: 0.5, borderRadius: 5, padding: 5, borderColor: 'black', borderStyle: 'solid', marginBottom: 5}}>
    { props.item.content}
  </div>
);

export default ListItem;