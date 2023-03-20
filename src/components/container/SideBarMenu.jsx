import React, { useState } from 'react';
import { classNames } from '../../models/classes';
import SideBarItemView from '../pure/SideBarItemView';
import { features } from '../../router/'

const SideBarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside 
            className={classNames('fixed h-full w-20 bg-primary transition-all z-30', isOpen ? 'expanded w-44' : null)}
            onMouseOver={() => setIsOpen(true)}
            onMouseOut={() => setIsOpen(false)}>
            <section className=' flex justify-center items-center h-20'>Logo</section>
            <section>
                { features.map((item) => (
                    <SideBarItemView key={item.id} item={item} isOpen={isOpen} ></SideBarItemView>
                ))}
            </section>
        </aside>
    );
}

export default SideBarMenu;