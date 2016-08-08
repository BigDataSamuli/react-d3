'use strict';

var React = require('react');
var Bar = require('./Bar');
var shade = require('../utils').shade;

module.exports = React.createClass({

  propTypes: {
    fill: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      fill: '#3182BD'
    };
  },

  getInitialState() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill
    };
  },

  componentWillReceiveProps(nextProps) {
      if (nextProps.fill !== this.props.fill) {
          this.setState({
              fill: nextProps.fill
          });
      }
  },

  render() {
    var props = this.props;

    var mouseOverHandler = props.hoverAnimation ? this._animateBar : null;
    var mouseLeaveHandler = props.hoverAnimation ? this._restoreBar : null;

    if (props.customBarComponent) {
        return (
            <props.customBarComponent
                {...props}
                fill={this.state.fill}
                handleMouseOver={mouseOverHandler}
                handleMouseLeave={mouseLeaveHandler}
            />
        );
    } else {

        return (
          <Bar
            {...props}
            fill={this.state.fill}
            handleMouseOver={mouseOverHandler}
            handleMouseLeave={mouseLeaveHandler}
            data={undefined}
          />
        );
    }
  },

  _animateBar() {
    this.setState({
      fill: shade(this.props.fill, 0.2)
    });
  },

  _restoreBar() {
    this.setState({
      fill: this.props.fill
    });
  },
});
