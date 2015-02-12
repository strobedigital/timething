var React = require('react');
var DateUtils = require('./date-utils.js');
var _ = require('lodash');
var moment = require('moment');

var App = React.createClass({
  getInitialState() {
    return {
      parsedDate: null,
      inputString: ""
    };
  },

  render() {

    var mParsedDate = moment(this.state.parsedDate),
        values = [],
        dateObjects = [];

    if(this.state.parsedDate) {
      values.push((<span>Date/Time <strong>{this.state.parsedDate.toString()}</strong></span>));
      values.push((<span>Timestamp <strong>{this.state.parsedDate.getTime()/1000}</strong></span>));
      values.push((<span>is <strong>{mParsedDate.fromNow()}</strong></span>));
      values.push((<span>ISO 8601 <strong>{mParsedDate.toISOString()}</strong></span>));
    }

    return (
      <div className="time">
        <h1>Time thing.</h1>
        <p>A simple utility for converting date/time and UNIX timestamp.</p>
        <input placeholder="Type a date or timestamp..." className="time__input" autoFocus={true} ref="input" type="text" onKeyUp={_.debounce(this._onInputKeyUp, 150)} />
        {this.state.parsedDate == null && this.state.inputString && <span className="time__error">Sorry, not sure how to parse that. <a href="https://github.com/strobedigital/timething/issues" target="_blank">Submit a bug</a>.</span>}
        {this.state.parsedDate == null && this.state.inputString.length == 0 && <span className="time__info">Example formats: '12-12-2015' or 'last week' or '1423440000'</span>}
        <ul className="time__results">
          {values.map(function(val) {
            return (<li className="time-result">{val}</li>);
          })}
        </ul>
        <div className="time__credit">
          <a target="_blank" href="//twitter.com/teamstrobe">by @teamstrobe</a>
        </div>
      </div>
    );
  },

  _onInputKeyUp(event) {
    var value = this.refs.input.getDOMNode().value
    this.setState({
      parsedDate: new DateUtils(value).dateObject(),
      inputString: value
    });
  }
});

module.exports = App;