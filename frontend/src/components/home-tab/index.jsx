import { Tab } from 'react-tabs';
import Items from "../home-tab/items";
import Item from "../home-tab/item";
import Content from "../home-tab/content";
//import StickyHeader from "../stickheader";
import PropTypes from 'prop-types'
//import {TabContext} from './tab-context';


export default function HomeTab( {children} ) {

    const contents = children.filter(c => c.type === Content)
    const items = children.filter(c => c.type === Items)

    console.log('children lar burada', children)

    return (
       <div>{items}</div>
    )
}

Tab.Items = Items
Tab.Item = Item
Tab.Content = Content

