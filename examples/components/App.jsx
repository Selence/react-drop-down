import React, { Component } from 'react';
import { DropDownBox } from '../../public/bundle';
import {CustumElements} from './CustumElements';

/**
 * @returns {XML}
 */
export class App extends Component {
    constructor(props) {
        super(props);
        this.renderListItems = this.renderListItems.bind(this);
    }

    clickHandler(selectedItem) {
        console.log(selectedItem);
    }

    getSelectBoxItems() {
        return [
            {key: 'nothing', item: 'bitte wählen'},
            {key: 'de', item: 'Deutschland'},
            {key: 'fr', item: 'Frankreich'},
            {key: 'gb', item: 'Großbritannien'}
        ];
    }

    renderListItems() {
        const list = this.getSelectBoxItems();
        let items = [];

        for (let i = 0; i < list.length; i++) {
            const item = list[i];

            items.push(
                {key: item.key ,item: <CustumElements key={i} item={item}/>}
            );
        }

        return items;
    }

    /**
     * @returns {XML}
     */
    render () {
        return (
            <div className="app">
                <DropDownBox
                    itemList={this.renderListItems()}
                    defaultSelection={'gb'}
                    selectHandler={this.clickHandler}
                    handleClickOutside={true}
                />
            </div>
        );
    }
}