'use strict';

var React = require('react');

module.exports = React.createClass({

  propTypes: {
    x:   React.PropTypes.number,
    y:   React.PropTypes.number,
    child: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.element
    ]),
    show: React.PropTypes.bool
  },

  render: function() {
    var props = this.props;
    var display = this.props.show ? 'inherit' : 'none';
    var containerStyles = {position: 'fixed', top: props.y, left: props.x, display: display}
    
    //TODO: add 'right: 0px' style when tooltip is off the chart
    var tooltipStyles = {
      position: 'absolute'
    }
    return (
      <div className="rd3-tooltip-container" style={containerStyles}>
        <div className="rd3-tooltip-body" style={tooltipStyles}>
          {props.child}
        </div>
      </div>
    );
  }
});
