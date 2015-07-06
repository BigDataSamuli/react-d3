'use strict';

var React = require('react');
var d3 = require('d3');
var BarContainer = require('./BarContainer');

module.exports = React.createClass({

  displayName: 'DataSeries',

  propTypes: {
    values:        React.PropTypes.array,
    labels:        React.PropTypes.array,
    data:          React.PropTypes.array,
    horizontal:    React.PropTypes.bool,
    colors:        React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    valueAccessor: React.PropTypes.func,
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

    var labelScale = d3.scale.ordinal()
      .domain(d3.range(props.values.length))
      .rangeRoundBands(props.labelScaleRange, props.padding);

    var bars = props.data.map((item, idx) => {
      var point = props.valueAccessor(item);
      var onClickHandler = null;
      if (props.onClickHandler) {
          onClickHandler = props.onClickHandler.bind(undefined, item);
      }

      var valueSpan = Math.abs(props.valueScale(point) - props.valueScale(0));
      var labelSpan = labelScale.rangeBand();

      var valuePosition = Math.min(props.valueScale(Math.min(0, point)), props.valueScale(Math.min(0, point) + Math.abs(point)));
      var labelPosition = labelScale(idx);

      return (
        <BarContainer
          width={props.horizontal ? valueSpan : labelSpan}
          height={props.horizontal ? labelSpan : valueSpan}
          y={props.horizontal ? labelPosition : valuePosition}
          x={props.horizontal ? valuePosition : labelPosition}
          availableHeight={props.height}
          availableWidth={props.width}
          fill={props.colors(props.colorAccessor(item, idx))}
          key={idx}
          hoverAnimation={props.hoverAnimation}
          onClickHandler={onClickHandler}
        />
      );
    });

    return (
      <g>{bars}</g>
    );
  }
});
