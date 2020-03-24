import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
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
            // error: false
        };

        // this.validateField = this.validateField.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        e.persist();

        const name = e.target.name;
        const value = e.target.value;

        this.setState({ value });

        this.props.onChange(name, value, false); // never errors
    }

    render() {
        return (
            <li>
                <label htmlFor="msg">{this.props.label}:</label>
                <textarea id={this.props.name} name={this.props.name} value={this.state.value} onChange={this.onChange}></textarea>
            </li>
        );
    }
}

export default Message;
