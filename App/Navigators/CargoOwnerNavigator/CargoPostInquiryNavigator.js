import React from 'react'
import {
  createStackNavigator,
} from 'react-navigation'

import CargoInquiryPostScreen from '../../Containers/CargoOwner/CargoInquiryPostScreen'
import CargoFormModal from '../../Components/CargoForm/CargoFormModal'
import Colors from '../../Theme/Colors'

const CargoPostInquiryNavigator = createStackNavigator(
  {
    CargoInquiryPostScreen: {
      screen: CargoInquiryPostScreen,
      navigationOptions: {
        headerStyle: {
        },
        headerTitle: 'Atlas',
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
          color: Colors.main,
          fontSize: 25,
        }
      },
    },
    Modal: { screen: CargoFormModal },
  },
  {
    // mode: 'modal',
    headerMode: 'screen',
  }
)

CargoPostInquiryNavigator.navigationOptions = ({navigation})=>{
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (routeName === 'Modal') {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
}

export default CargoPostInquiryNavigator
