import React, {useState} from 'react';
import Items from "./items";
import Item from "./item";
import Content from "./content";
import {TabContext} from './context';
//import StickyHeader from "../stickheader";
import PropTypes from 'prop-types'
import { useEffect } from 'react';
export default function Tab( {children, activeTab} ) {

    const [active, setActive] = useState(activeTab)

    const contents = children.filter(c => c.type === Content)
    const items = children.filter(c => c.type === Items)
    const content = contents.find(c => c.props.id === active)

    useEffect(() => {
        setActive(activeTab)
    }, [activeTab])

    const data = {
        active,
        setActive
    }

    return (
        <TabContext.Provider value={data}>
            <div>
                {items}
            </div>
            
                {content}
        </TabContext.Provider> 
     
    )
}

Tab.Items = Items
Tab.Item = Item
Tab.Content = Content

Tab.propTypes = {
    children: PropTypes.arrayOf( PropTypes.node ), activeTab: PropTypes.string.isRequired
}

