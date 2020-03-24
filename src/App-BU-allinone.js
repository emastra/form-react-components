import React, { Component } from 'react';
import './App.css';

const isEmail = (email) => {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
}

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
        this.validateField = this.validateField.bind(this);
    }

    handleShowClick(e) {
        const name = e.target.name;
        if (name === 'a') console.log(this.state);
        else console.log(this.state.fields);

    }

    handleInputChange(e) {
        e.persist();

        const name = e.target.name;
        const value = e.target.value;

        // validate the current field
        const error = this.validateField(value, name);

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

    validateField(value, name) {
        if (name === 'name')
            return value.length > 1 ? false : 'name is too short';
        if (name === 'email')
            return isEmail(value) ? false : 'Invalid email';
        if (name === 'topic' || name === 'course')
            return value ? false : 'Gotta make a choice here';

        return false;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-top">
                        <h1>CS Courses</h1>
                        <p>Sign up for your course today!</p>
                        <button name="a" type="button" className="button show-state-btn" onClick={this.handleShowClick}>Show current app state</button>
                        <button name="f" type="button" className="button show-state-btn" onClick={this.handleShowClick}>Show current fields state</button>
                    </div>

                    <ul>
                        <li>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={this.state.fields.name} onChange={this.handleInputChange} />
                            <span className="error-span">{this.state.fieldErrors['name']}</span>
                        </li>
                        <li>
                            <label htmlFor="mail">E-mail:</label>
                            <input type="text" id="mail" name="email" value={this.state.fields.email} onChange={this.handleInputChange} />
                            <span className="error-span">{this.state.fieldErrors['email']}</span>
                        </li>
                        <li>
                            <label htmlFor="topic">Topic:</label>
                            <select name="topic" id="topic" value={this.state.fields.topic} onChange={this.handleInputChange}>
                                <option value="">--Please choose a topic--</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="hamster">Hamster</option>
                            </select>
                            <span className="error-span">{this.state.fieldErrors['topic']}</span>
                        </li>
                        <li>
                            <label htmlFor="course">Course:</label>
                            <select name="course" id="course" value={this.state.fields.course} onChange={this.handleInputChange}>
                                <option value="">--Please choose a course--</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="hamster">Hamster</option>
                            </select>
                            <span className="error-span">{this.state.fieldErrors['course']}</span>
                        </li>
                        <li>
                            <label htmlFor="msg">Message:</label>
                            <textarea id="msg" name="message" value={this.state.fields.message} onChange={this.handleInputChange}></textarea>
                        </li>
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
