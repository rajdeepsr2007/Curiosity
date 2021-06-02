import React from 'react';
import {Dialog , DialogTitle , DialogContent} from '@material-ui/core';

const ScrollableModal = (props) => {

    const scroll = 'paper'

    return (
        <Dialog
        open={props.show}
        onClose={props.onClick}
        scroll={scroll}
        >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                {props.children}
            </DialogContent>
      </Dialog>
    )
}

export default ScrollableModal;