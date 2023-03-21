import React, { useState } from 'react';
import { classNames } from '../../models/classes';
import SideBarItemView from '../pure/SideBarItemView';
import { features, settings } from '../../router/'

const SideBarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside 
            className={classNames('fixed flex flex-col justify-start h-full w-20 bg-primary transition-all z-30', isOpen ? 'expanded w-44' : null)}
            onMouseOver={() => setIsOpen(true)}
            onMouseOut={() => setIsOpen(false)}>
            <section className=' flex justify-center items-center h-1/6'>
                Logo
            </section>
            <section className='flex flex-col justify-between h-5/6'>
                <div className='flex flex-col gap-6'>
                    { features.map(item => (
                        <SideBarItemView key={item.id} item={item} isOpen={isOpen} ></SideBarItemView>
                    ))}
                </div>
                <div className='pb-4'>
                    { settings.map(item => (
                        <SideBarItemView key={item.id} item={item} isOpen={isOpen} ></SideBarItemView>
                    ))}
                </div>
            </section>
        </aside>
    );
}

export default SideBarMenu;