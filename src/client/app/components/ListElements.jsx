import React from 'react';

/**
 * @param {Function} handler
 * @param {Object} item
 */
export const ListElement = ({
    handler,
    item
}) => {

    return (
        <li onClick={handler.bind(this, item)}>
            {item}
        </li>
    )
};