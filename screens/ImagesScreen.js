import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button
} from 'react-native';
import SingleSubjectBox from '../components/SingleSubjectBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import AmrImage from '../components/AmrImage'

export default class ImagesScreen extends React.Component {


	static navigationOptions = ({ navigation }) => ({
		title:'Free Browsing',
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
	componentDidMount() {


    fetch(Server.dest + '/api/images?id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((supjects)=>{
								this.setState({
									doneFetches: 1,
									Subjects: supjects
								});
							});
	}


	_keyExtractor = (item, index) => item.id;



	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			Subjects: [

      ],

		};
	}

	render() {
		const { navigate } = this.props.navigation;

		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color={Colors.mainColor} />;

		return (


				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5,backgroundColor: Colors.smoothGray  }} />
					)}
          keyExtractor={this._keyExtractor}
					data={this.state.Subjects}
					renderItem={({ item }) => (
							<AmrImage
								image={item.image}
							/>
					)}
				/>

		);
	}
}
