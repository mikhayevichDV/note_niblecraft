import React from 'react';

const TagsPanel = (tags: any): any => {

    const deleteTag = (tag: string): any => {

    }

    const filterTag = () => {

    }

    return tags.tags.map((elem: any, index: any) => {
        return <div key={index}>
            <span onClick={filterTag}>{elem}</span>
            <button onClick={deleteTag(elem)}>x</button>
        </div>
    })
};

export default TagsPanel;
