import React from 'react';

export const AddSectionButtoon = ({ handleClick }) => {
    return (
        <div className={ 'position-relative' }>
            <button type={ 'button' } className={ 'position-absolute bottom-0 end-0 btn btn-default' } onClick={ handleClick }>+</button>
        </div>
    );
};
