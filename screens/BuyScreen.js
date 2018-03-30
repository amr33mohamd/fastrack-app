import React from 'react';
import Expo, { Constants, WebBrowser } from 'expo';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button,
	WebView,
	Linking
} from 'react-native';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';



export default class BuyScreen extends React.Component {


	static navigationOptions = ({ navigation }) => ({
		title:'Buy Now',
		headerTintColor: Colors.smoothGray,
		fontFamily:'myfont',
	headerStyle: {
		backgroundColor: Colors.mainColor,
		marginTop:-25
	},
	headerTitleStyle: {
		fontWeight: '300',
		color: '#ffffff',
		fontFamily: 'myfont',
		fontSize: 16
	},
	});


//Server.dest+'/buy-first?id='+this.props.navigation.state.params.id
	constructor(props) {
		super(props);

	}

	render() {
		 const uri = Server.dest+'/buy-first?id='+this.props.navigation.state.params.key+'&deviceId='+Expo.Constants.deviceId;
		// const uri = "http://example.com"
		return (

      <View style={{ flex: 1 }}>
         <WebView
           bounces={false}
           scrollEnabled={true}
					 ref={(ref) => { this.webview = ref; }}
           source={{ uri }}
					 onNavigationStateChange={(event) => {
          if (event.url == 'http://example.com/') {
            this.webview.stopLoading();
            this.props.navigation.navigate('Notes')
          }}
				}
					 />
       </View>

		);
	}
}
