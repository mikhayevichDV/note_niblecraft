import React from 'react';
import "../styles/app.scss"

interface TagsPanelProps {
    tags: Array<string>;
    deleteTag: (tagValue: string) => void;
    selectTag: (value: string | null) => void;
}

const TagsPanel = ({tags, deleteTag, selectTag}: TagsPanelProps) => {

    const createTags = (tags: string[]) => {
        return tags.map((elem: string, index: number) => {
            return <div className="tags-container" key={index}>
                <span className="tag-filter" onClick={() => selectTag(elem)}>{elem} </span>
                <button className="delete-btn" onClick={() => deleteTag(elem)}> ⊘ </button>
            </div>
        })
    }

    return <>
        {createTags(tags)}
        <span className="tag-filter" onClick={() => selectTag(null)}>Show all tags</span>
    </>

};

export default TagsPanel;
