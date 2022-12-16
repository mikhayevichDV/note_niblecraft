import React from 'react';

import "../styles/app.scss"

interface HeaderProps {
    todoCount:number;
}

const Header: React.FC<HeaderProps> = ({todoCount}) => {
    return (
        <div>
           Todo list <b>{todoCount} task(s)</b>
        </div>
    );
};

export default Header;
