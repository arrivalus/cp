import React from 'react';
import s from './styles.module.css'

const Container = ({children}) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    );
};

export default Container;
