// problem of state.value here being derived from props
// we use it to avoid waiting for eventual async call to db
// https://blog.bitsrc.io/managing-derived-state-from-props-in-react-f26b5b15069
// https://medium.com/@admin_86118/react-re-render-child-components-on-parent-state-change-387720c3cff8

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isEmail = (email) => {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}


class Field extends Component {
    /*
        label
        name
        value
        onChange
    */

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            error: false
        };

        this.validateField = this.validateField.bind(this);
        this.onChange = this.onChange.bind(this);

        console.log('Field Constr. State:', this.state);
    }

    // static getDerivedStateFromProps(nextProps) {
    //     return { value: nextProps.value }
    // }

    validateField(value, name) {
        if (name === 'name')
            return value.length > 1 ? false : 'name is too short';
        if (name === 'email')
            return isEmail(value) ? false : 'Invalid email';

        return false;
    }

    onChange(e) {
        e.persist();

        const name = e.target.name;
        const value = e.target.value;

        // validate the current field
        const error = this.validateField(value, name);

        this.setState({ value, error });

        this.props.onChange(name, value, error);
    }

    render() {
        return (
            <li>
                <label htmlFor="name">{this.props.label}:</label>
                <input type="text" id={this.props.name} name={this.props.name} value={this.state.value} onChange={this.onChange} />
                <span className="error-span">{this.state.error}</span>
            </li>
        );
    }
}

export default Field;
