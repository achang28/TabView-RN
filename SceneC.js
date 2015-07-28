'use strict';

// REACT PARTS
var Display = require('react-native-device-display');
var React = require("react-native");

var {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
} = React;

var SceneC = React.createClass({
	_styles: StyleSheet.create({
		container: {
			backgroundColor: "#01DFD7",
			flex: 1,
			height: 400,
			width: Display.width,
		},
		text: {
			fontSize: 34,
			color: "#FF0000"
		}
	}),
	
	propTypes: {
		renderScene: React.PropTypes.func,
  },

	render: function() {
		return (
      <View style={this._styles.container}>
      	<TouchableHighlight
      		onPress={() => this.props.renderScene(1)}>
        	<Text style={this._styles.text}>Page C</Text>
        </TouchableHighlight>
      </View>
    );
	},
});

module.exports = SceneC;