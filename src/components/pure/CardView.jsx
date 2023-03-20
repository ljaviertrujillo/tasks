import React from 'react';
import { classNames } from '../../models/classes';
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'

const CardView = ({card, isOpen, toggle, options}) => {
    return (
        <div className={classNames('card-view', isOpen ? 'expanded' : null)}>
            {card.photoUrl ? (
                <img className='picture' src={card.photoUrl} width='100%'/>
            ) : (
                <span className='picture'>{card.displayName[0]}</span>
            )}
            <div className='profile-info'>
                <button className='profile-btn' onClick={toggle}>
                    <span>{card.displayName}</span>
                    {options 
                        ? <BsChevronCompactLeft />
                        : <BsChevronCompactRight />
                    }
                    
                </button>
            </div>
        </div>
    );
}

export default CardView;
