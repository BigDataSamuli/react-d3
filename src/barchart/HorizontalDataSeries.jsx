'use strict';

var React = require('react');
var d3 = require('d3');
var BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'HorizontalDataSeries',

  propTypes: {
    values:        React.PropTypes.array,
    labels:        React.PropTypes.array,
    colors:        React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    width:         React.PropTypes.number,
    height:        React.PropTypes.number,
    offset:        React.PropTypes.number
  },

  getDefaultProps() {
    return {
      padding: 0.1,
      values: []
    };
  },

  render() {

    var props = this.props;

    var yScale = d3.scale.ordinal()
      .domain(d3.range(props.values.length))
      .rangeRoundBands([0, props.height], props.padding);

    var bars = props.values.map((point, idx) => {
      return (
        <BarContainer
          width={Math.abs(props.xScale(point) - props.xScale(0))}
          height={yScale.rangeBand()}
          y={yScale(idx)}
          x={props.xScale(Math.min(0, point))}
          availableHeight={props.height}
          fill={props.colors(props.colorAccessor(point, idx))}
          key={idx}
          hoverAnimation={props.hoverAnimation}
        />
      );
    });

    return (
      <g>{bars}</g>
    );
  }
});
