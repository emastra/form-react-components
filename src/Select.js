import React, { Component } from 'react';
import PropTypes from 'prop-types';

import courses from './courses.json';


class Select extends Component {
    /*
        label
        name
        value
        onChange
        topic
    */

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            error: false
        };

        this.validateField = this.validateField.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    // static getDerivedStateFromProps(nextProps) {
    //     return { value: nextProps.value }
    // }

    onChange(e) {
        e.persist();

        const name = e.target.name;
        const value = e.target.value;

        // validate the current field
        const error = this.validateField(value, name);

        this.setState({ value, error });

        this.props.onChange(name, value, error);
    }

    validateField(value, name) {
        if (name === 'topic' || name === 'course')
            return value ? false : 'Gotta make a choice here';

        return false;
    }

    render() {
        const topicCourses = this.props.topic ? courses[this.props.topic] : [];

        return (
            <li>
                <label htmlFor={this.props.name}>{this.props.label}:</label>
                <select name={this.props.name} id={this.props.name} value={this.state.value} onChange={this.onChange}>
                    {this.props.name === 'topic'
                        ? <option value="">--Please choose a topic--</option>
                        : <option value="">--Please choose a course--</option>
                    }
                    {this.props.name === 'topic'
                        ? Object.keys(courses).map((topic) => (
                            <option value={topic}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</option>
                        ))
                        : topicCourses.map((courseName) => (
                            <option value={courseName}>{courseName}</option>
                        ))
                    }
                </select>
                <span className="error-span">{this.state.error}</span>
            </li>
        );
    }
}

export default Select;
