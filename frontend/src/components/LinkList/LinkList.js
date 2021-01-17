import React from 'react';

const LinkList = (props) => {
    let links = []
    links = props.linkArray.map (li => (
        <a key={li} href={li} class="list-group-item list-group-item-action">{li}</a>
    ))
    return (
        <div class="list-group LinkGroup">
            {links}
        </div>
    );
}

export default LinkList;