import './styles/main.scss';
import React, { Component } from 'react';
import classNames  from 'classnames';
import PropTypes from 'prop-types';
import {ListElement} from './ListElements';

/**
 * @returns {XML}
 */
export default class DropDownBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listVisible: false,
            selectedItem: null
        };

        this.addEventListeners = {};

        this.show = this.show.bind(this);
        this.handleVisibility = this.handleVisibility.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.handleEventListener = this.handleEventListener.bind(this);
    }

    handleEventListener(eventType, fun) {
        if(this.props.handleClickOutside) {
            if (!this.addEventListeners[eventType]) {
                this.addEventListeners[eventType] = fun;
                document.addEventListener(eventType, fun);
            } else {
                delete this.addEventListeners[eventType];
                document.removeEventListener(eventType, fun);
            }
        }
    }

    select(item) {
        this.props.selectHandler && this.props.selectHandler(item.key);
        this.handleEventListener('click', this.handleVisibility);
        this.setState({
            listVisible: !this.state.listVisible,
            selectedItem: item.key
        });
    }

    show() {
        this.setState({listVisible: !this.state.listVisible});
        this.handleEventListener('click', this.handleVisibility);
    }

    handleVisibility() {
        this.setState({listVisible: !this.state.listVisible});
        this.handleEventListener('click', this.handleVisibility);
    }

    renderListItems() {
        const { itemList } = this.props;
        let items = [];

        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];

            items.push(
                <ListElement key={i} handler={this.select.bind(this, item)} item={item.item}/>
            );
        }
        return items;
    }

    render() {
        const {itemList, defaultSelection} = this.props;
        const visibleItem = (!this.state.selectedItem) ? defaultSelection : this.state.selectedItem;

        const dropDownContainerCss = classNames(
            'dropdown-container',
            {'show': this.state.listVisible}
        );

        const dropDownDisplayCss = classNames(
            'dropdown-display',
            {'clicked': this.state.listVisible}
        );

        return (
            <div className={dropDownContainerCss}>
                <div
                    className={dropDownDisplayCss}
                    onClick={this.show}>
                    <span>
                        {itemList.map(({key, item}) => key === visibleItem && item )}
                    </span>
                    <i className="fa fa-angle-down"/>
                </div>
                <div className="dropdown-list">
                    <div>
                        {this.renderListItems()}
                    </div>
                </div>
            </div>
        )
    };
}

DropDownBox.propTypes = {
    itemList: PropTypes.array,
    defaultSelection: PropTypes.string,
    selectHandler: PropTypes.func,
    handleClickOutside: PropTypes.bool
};
