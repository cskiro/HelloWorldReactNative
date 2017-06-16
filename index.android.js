/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class HelloWorldReactNative extends Component {
     /** Adding initial state to determine if data can be loaded or not */
     constructor(props) {
        super(props);
        this.state = {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
          loaded: false,
        };
      }

      /**
       * Sending of the request after the component has finished loading. This will only get called once.
       */
      componentDidMount() {
        this.fetchData();
      }

      /** Responsible for handling the fetching of the data */
      fetchData() {
        fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
            /** Setting the data when the response comes back */
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
              loaded: true,
            });
          })
          .done();
      }

        /**
         * Renders a ListView of movies once data comes back
         */
      render() {
        if (!this.state.loaded) {
          return this.renderLoadingView();
        }

        return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}
          />
        );
      }

      renderLoadingView() {
        return (
          <View style={styles.container}>
            <Text>
              Loading movies...
            </Text>
          </View>
        );
      }

      renderMovie(movie) {
        return (
          <View style={styles.container}>
            <Image
              source={{uri: movie.posters.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.year}>{movie.year}</Text>
            </View>
          </View>
        );
      }
    }

    var styles = StyleSheet.create({
      container: {
        flex: 1,
        /** Lays out children horizontally within the container */
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      rightContainer: {
        flex: 1,
      },
      title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
      },
      year: {
        textAlign: 'center',
      },
      thumbnail: {
        width: 53,
        height: 81,
      },
      listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
      },
    });

AppRegistry.registerComponent('HelloWorldReactNative', () => HelloWorldReactNative);
