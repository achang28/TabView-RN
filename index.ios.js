'use strict';

// REACT PARTS
var Display = require('react-native-device-display');
var React = require("react-native");
var TabView = require('react-native-scrollable-tab-view');

// COMPONENTS
var SceneA = require("./SceneA");
var SceneB = require("./SceneB");
var SceneC = require("./SceneC");

// Utilities
var precomputeStyle = require('precomputeStyle');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var TabBarExample = React.createClass({
  getInitialState: function() {
    return {
      renderScene: null,
    };
  },

  _delegateMethod: function(method) {
    this.setState({
      renderScene: method,
    });
  },

  _renderTabBar: function() {
    return (
      <TabBar delegateMethod={this._delegateMethod} />
    );
  },

  render: function() {
    return (
      <TabView
        renderTabBar={this._renderTabBar}
        springTension={55}
        springFriction={10}>
        <SceneA
          renderScene={this.state.renderScene}
          tabLabel="Scene1" />
        <SceneB
          renderScene={this.state.renderScene}
          tabLabel="Scene2" />
        <SceneC
          renderScene={this.state.renderScene}
          tabLabel="Scene3" />
      </TabView>
    );
  }
});


/***************************************************************
****************************************************************
              C U S T O M   T A B   B A R

*****************************************************************/
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';
var TabBar = React.createClass({
  _styles: StyleSheet.create({
    statusBar: {
      backgroundColor: "#A4A4A4",
      flex: 1,
      height: 20,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
    }, tabText: {
      alignSelf: "center",
      fontFamily: "helvetica",
      fontSize: 16,
    }, tabActive: {
      fontWeight: "bold",
    }, tabInactive: {
      fontWeight: "200",
    },
    tabs: {
      height: 50,
      flexDirection: 'row',
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomColor: '#ccc',
    },
  }),
  propTypes: {
    delegateMethod: React.PropTypes.func,
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  componentWillMount: function() {
    this.props.delegateMethod(this.props.goToPage);
  },

  renderTabItem: function(tabName, tabIndex) {
    var isTabActive = this.props.activeTab === tabIndex;

    return (
      <TouchableOpacity
        key={tabName}
        onPress={() => this.props.goToPage(tabIndex)}>
        <View style={this._styles.tab}>
          <Text style={[this._styles.tabText, isTabActive ? this._styles.tabActive : this._styles.tabInactive]}>{tabName}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  setAnimationValue: function(value) {
    this.refs[TAB_UNDERLINE_REF].setNativeProps(precomputeStyle({
      left: (Display.width * value) / this.props.tabs.length
    }));
  },

  render: function() {
    var underlineStyle = {
      position: 'absolute',
      width: Display.width / this.props.tabs.length,
      height: 4,
      bottom: 0,
    };

    return (
      <View>
        <View style={this._styles.statusBar}></View>
        <View style={this._styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabItem(tab, i))}
          <View style={underlineStyle} ref={TAB_UNDERLINE_REF} />
        </View>
      </View>
    );
  },
});

AppRegistry.registerComponent('TabView', () => TabBarExample);
