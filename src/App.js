import React, { Component } from 'react';
import Field from './Field.js';
import Select from './Select.js';
import Textarea from './Textarea.js';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                name: '',
                email: '',
                topic: '',
                course: '',
                message: ''
            },
            fieldErrors: {}, // { name: false, email: 'Error message', topic: ...}
            subscriptions: []
        };

        this.handleShowClick = this.handleShowClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

        console.log('App Constr!');
    }

    handleShowClick(e) {
        const name = e.target.name;
        if (name === 'a') console.log(this.state);
        else console.log(this.state.fields);

    }

    handleInputChange(name, value, error) {
        const fields = Object.assign({}, this.state.fields); // first copy(deep?) this.state.fields
        fields[name] = value; // modify it

        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fieldErrors[name] = error;

        this.setState({ fields, fieldErrors }); // shallow merge is only one level deep. this.setState({ fields: { [name]: value } }); replaces the field prop
    }

    handleSubmit(e) {
        e.preventDefault();

        // validate the whole form
        const isErrors = this.validateForm();
        if (isErrors) return; // do nothing if errors. error messages are already diplayed.

        this.setState((state) => {
            // these are reference to state props
            const currentFields = state.fields;
            const subscriptions = state.subscriptions;

            // updatedSubs is a new array (deep copy?)
            const updatedSubs = subscriptions.concat(currentFields);

            return {
                subscriptions: updatedSubs,
                // reset inputs value (in the app state which will be respectively set to the input value)
                fields: {
                    name: '',
                    email: '',
                    topic: '',
                    course: '',
                    message: ''
                },
            };
        });
    }

    validateForm() {
        const sub = this.state.fields;
        const isErrors = Object.values(this.state.fieldErrors).some(v => v);

        // check required fields
        if (!sub.name) return true;
        if (!sub.email) return true;
        if (!sub.topic) return true;
        if (!sub.course) return true;

        // check if any errors
        if (isErrors) return true;

        return false; // no errors returns false
    }

    // validateField(value, name) {
    //     if (name === 'name')
    //         return value.length > 1 ? false : 'name is too short';
    //     if (name === 'email')
    //         return isEmail(value) ? false : 'Invalid email';
    //     if (name === 'topic' || name === 'course')
    //         return value ? false : 'Gotta make a choice here';
    //
    //     return false;
    // }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-top">
                        <h1>CS Courses</h1>
                        <p>Sign up for your course today!</p>
                        <button name="a" type="button" className="button show-state-btn" onClick={this.handleShowClick}>Show current app state</button>
                        <button name="f" type="button" className="button show-state-btn" onClick={this.handleShowClick}>Show current fields state</button>
                        <button name="f2" type="button" className="button show-state-btn" onClick={this.handleShowClick}>Show current fields state2</button>
                    </div>

                    <ul>
                        <Field
                            label='Name'
                            name='name'
                            value={this.state.fields.name}
                            onChange={this.handleInputChange}

                        />
                        <Field
                            label='E-mail'
                            name='email'
                            value={this.state.fields.email}
                            onChange={this.handleInputChange}
                        />

                        <Select
                            label='Topic'
                            name='topic'
                            value={this.state.fields.topic}
                            onChange={this.handleInputChange}
                        />
                        <Select
                            label='Course'
                            name='course'
                            value={this.state.fields.course}
                            onChange={this.handleInputChange}
                            topic={this.state.fields.topic}
                        />

                        <Textarea
                            label='Message'
                            name='message'
                            value={this.state.fields.message}
                            onChange={this.handleInputChange}
                        />
                        <li>
                            <button type="submit" className="button submit-btn">Submit</button>
                        </li>
                    </ul>
                </form>

                <div className="people-container">
                    <h3>People</h3>
                    <ol>
                        {this.state.subscriptions.map((sub) => {
                            return <li>{sub.name} ({sub.email}): {sub.topic}/{sub.course} ["{sub.message}"]</li>
                        })}
                    </ol>
                </div>
            </div>

        );
    }
}

export default App;
