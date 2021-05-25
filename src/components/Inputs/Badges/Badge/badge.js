import { Chip } from '@material-ui/core';
import React from 'react';

const Badge = (props) => {
    return (
        <Chip
        style={{ margin : '0.5rem' }}
        label={props.badge}
        color="secondary"
        variant="outlined"
        onDelete={props.onDelete}
      />
    )
}

export default Badge;