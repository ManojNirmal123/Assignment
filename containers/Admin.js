import React, { Component } from "react";
import ProductListItemAdmin from "../components/ProductListItemAdmin";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
  View,
  TextInput
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
let URI = "http://10.100.218.40:4000";
class Admin extends React.PureComponent {
  constructor(props) {
    super(props);
    //this.state = {search:''}
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }

  onDelete = id => {
    Alert.alert(
      'Are you sure you want to Delete this Product',
      'Please choose any option!',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.props.actions.deleteProducts(id)},
      ],
      { cancelable: false }
    )
    
   // this.props.actions.deleteProducts(id);
 
   // console.log('===============',this.props.products);
    //this._getProducts(this.props.page, this.props.limit);
    //this._getProducts(this.props.page, this.props.limit);
    // TODO: when user taps on the heart icon, you 
    // need to change the icon to full heart, which is 
    // already handled in ProductListItem based on wish property
    // you need to set the wish property to true for the tapped product
    // which is already in the state
    // implement above using react redux
  };

  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
  };

  /* Get searched products */
  
  // getSearchProducts = (search = '', page = 1, limit = 8) => {
  //   this.setState({state:search});
  //   this.props.actions.getSearchProducts(search, page, limit);
  // };


  /*  flat list supporting methods */

  _getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
  };

  _renderItem = ({ index, item }) => {
    return (
      <ProductListItemAdmin
        {...this.props}
        id={item.id}
        title={`${item.id} - ${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
        wish={item.wish || false}
        onDelete={this.onDelete}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onRefresh = () => {
    //this.setState({ isRefreshing: true });
    this._getProducts(1,8);
  };

  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.props.isRefreshing}
        tintColor={"#00ff80"}
        title={"Refreshing..."}
        titleColor={"#00ff80"}
      />
    );
  }

  /*  flat list supporting methods - END */

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
          <View>
            {/* <TextInput onChangeText={this.getSearchProducts}/> */}
          <FlatList
            data={this.props.products}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this._getMore}
            refreshControl={this._renderRefreshControl()}
          />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  Admin
);
