import React, {MouseEventHandler} from 'react';

const TagsPanel= (tags:any) => {

    const deleteTags = (tags:any,elem:string):MouseEventHandler<HTMLButtonElement> => {
       return tags.filter((tag:string)=>tag!==elem)
    }

    return tags.tags.map((elem: string, index: number) => {
        return <div key={index}>
            <span >{elem}</span>
            <button onClick={deleteTags}>x</button>
        </div>
    })
};

export default TagsPanel;
