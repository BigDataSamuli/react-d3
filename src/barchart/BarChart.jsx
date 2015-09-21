'use strict';

var React = require('react');
var d3 = require('d3');
var DataSeries = require('./DataSeries');

var { Chart, XAxis, YAxis } = require('../common');
var { CartesianChartPropsMixin } = require('../mixins');

module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin ],

  displayName: 'BarChart',

  propTypes: {
    data:           React.PropTypes.array,
    width:          React.PropTypes.number,
    margins:        React.PropTypes.object,
    height:         React.PropTypes.number,
    title:          React.PropTypes.string,
    horizontal:     React.PropTypes.bool,
    hoverAnimation: React.PropTypes.bool,
    valueAxisMin:   React.PropTypes.number,
    valueAxisMax:   React.PropTypes.number,
    valueAccessor:  React.PropTypes.func,
    secondaryValueAxisLabel: React.PropTypes.string,
    customBarComponent: React.PropTypes.func,
    renderCustomChartArea: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      xAxisTickCount: 4,
      yAxisTickCount: 4,
      margins: {top: 10, right: 20, bottom: 40, left: 45},
      horizontal: false,
      hoverAnimation: true,
      valueAccessor: (item) => item.value
    };
  },

  render() {

    var props = this.props;

    var values = props.data.map(props.valueAccessor);
    var labels = props.data.map(item => item.label);
    var secondaryValues = props.data.map(item => item.secondaryValue);

    var margins = props.margins;

    var sideMargins = margins.left + margins.right;
    var topBottomMargins = margins.top + margins.bottom;

    var minValue = props.valueScaleMin !== undefined ? props.valueScaleMin : Math.min(d3.min(values), 0);
    var maxValue = props.valueScaleMax !== undefined ? props.valueScaleMax : Math.max(d3.max(values), 0);

    var areaWidth = props.width - sideMargins;
    var areaHeight = props.height - topBottomMargins;

    var valueScaleRange = props.horizontal ? [0, areaWidth] : [areaHeight, 0];
    var labelScaleRange = props.horizontal ? [0, areaHeight] : [0, areaWidth];

    var valueScale = d3.scale.linear()
      .domain([minValue, maxValue])
      .range(valueScaleRange);

    var labelScale = d3.scale.ordinal()
        .domain(labels)
        .rangeBands(labelScaleRange, 0.1);

    var secondaryValueScale = d3.scale.ordinal()
        .domain(secondaryValues)
        .rangeBands(labelScaleRange, 0.1);

    var xScale, yScale;
    if (props.horizontal) {
        xScale = valueScale;
        yScale = labelScale;
    } else {
        xScale = labelScale;
        yScale = valueScale;
    }

    var valueAxisStroke = '#000';
    var valueAxisStrokeWidth = '1';
    var labelAxisStroke = 'none';
    var labelAxisStrokeWidth = 'none';

    var xAxisStroke = props.horizontal ? valueAxisStroke : labelAxisStroke;
    var xAxisStrokeWidth = props.horizontal ? valueAxisStrokeWidth : labelAxisStrokeWidth;

    var yAxisStroke = props.horizontal ? labelAxisStroke : valueAxisStroke;
    var yAxisStrokeWidth = props.horizontal ? labelAxisStrokeWidth : valueAxisStrokeWidth;

    var trans = `translate(${ margins.left },${ margins.top })`;

    var secondaryValueAxis;
    if (secondaryValues) {
        secondaryValueAxis = (
            <YAxis
                yAxisClassName='rd3-barchart-yaxis'
                yAxisLabel={props.secondaryValueAxisLabel}
                yAxisLabelOffset={props.secondaryValueAxisLabelOffset}
                yScale={secondaryValueScale}
                data={props.data}
                margins={margins}
                tickFormatting={props.yAxisFormatter}
                width={props.width - sideMargins}
                height={props.height - topBottomMargins}
                stroke={yAxisStroke}
                strokeWidth={yAxisStrokeWidth}
                yOrient='right'
                tickStroke='none'
            />
        );
    } else {
        secondaryValueAxis = (
            <XAxis
                xAxisClassName='rd3-barchart-xaxis'
                xAxisLabel={props.xAxisLabel}
                xAxisLabelOffset={props.secondaryValueAxisLabelOffset}
                xScale={secondaryValueScale}
                data={props.data}
                margins={margins}
                tickFormatting={props.xAxisFormatter}
                width={props.width - sideMargins}
                height={props.height - topBottomMargins}
                stroke={xAxisStroke}
                strokeWidth={xAxisStrokeWidth}
                xOrient='top'
                tickStroke='none'
            />
        );
    };

    return (
      <Chart
        viewBox={props.viewBox}
        legend={props.legend}
        data={props.data}
        margins={props.margins}
        colors={props.colors}
        colorAccessor={props.colorAccessor}
        width={props.width}
        height={props.height}
        title={props.title}
      >
        <g transform={trans} className='rd3-barchart'>
          {this.props.renderCustomChartArea ?
            this.props.renderCustomChartArea(areaWidth, xScale, areaHeight, yScale) :
            null}
          <DataSeries
            values={values}
            labels={labels}
            yScale={yScale}
            xScale={xScale}
            valueScale={valueScale}
            valueScaleRange={valueScaleRange}
            labelScale={labelScale}
            labelScaleRange={labelScaleRange}
            horizontal={props.horizontal}
            margins={margins}
            data={props.data}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
            colors={props.colors}
            colorAccessor={props.colorAccessor}
            valueAccessor={props.valueAccessor}
            hoverAnimation={props.hoverAnimation}
            customBarComponent={props.customBarComponent}
          />
          <YAxis
            yAxisClassName='rd3-barchart-yaxis'
            yAxisTickValues={props.yAxisTickValues}
            yAxisLabel={props.yAxisLabel}
            yAxisLabelOffset={props.yAxisLabelOffset}
            yScale={yScale}
            data={props.data}
            yAxisTickCount={props.yAxisTickCount}
            margins={margins}
            tickFormatting={props.yAxisFormatter}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
            stroke={yAxisStroke}
            strokeWidth={yAxisStrokeWidth}
          />
          <XAxis
            xAxisClassName='rd3-barchart-xaxis'
            xAxisTickValues={props.xAxisTickValues}
            xAxisLabel={props.xAxisLabel}
            xAxisLabelOffset={props.xAxisLabelOffset}
            xScale={xScale}
            data={props.data}
            margins={margins}
            xAxisTickCount={props.xAxisTickCount}
            tickFormatting={props.xAxisFormatter}
            width={props.width - sideMargins}
            height={props.height - topBottomMargins}
            stroke={xAxisStroke}
            strokeWidth={xAxisStrokeWidth}
          />
        {secondaryValueAxis}
        </g>
      </Chart>
    );
  }

});
