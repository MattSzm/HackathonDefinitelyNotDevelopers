import React from 'react';

const LinkList = (props) => {
    let links = []
    links = props.linkArray.map (li => (
        <a key={li.id} href={li.url} class="list-group-item list-group-item-action">{li.url}</a>
    ))
    return (
        <div class="list-group LinkGroup">
            {links}
        </div>
    );
}

export default LinkList;