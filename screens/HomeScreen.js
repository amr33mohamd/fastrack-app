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
import UniveristyBox from '../components/UniveristyBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';

var styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
		borderColor: 'gray',
		borderWidth: 0.3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 5,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,
		flex: 1
	},

	topbox: {
		alignItems: 'center',
		height: 55,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},

	restaurant: {
		backgroundColor: 'white',
		flex: 1,
		padding: 100
	}
});

export default class HomeScreen extends React.Component {
	componentDidMount() {


    fetch(Server.dest + '/api/universities').then((res)=>res.json()).then((universities)=>{
								this.setState({
									doneFetches: 1,
									Uninveristies: universities.data
								});
							});
	}



  _keyExtractor = (item, index) => item.id;


	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 0,
			Uninveristies: [

      ],

		};
	}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color={Colors.mainColor} />;

		return (
			<View>

				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5,backgroundColor: Colors.smoothGray  }} />
					)}
          keyExtractor={this._keyExtractor}
					data={this.state.Uninveristies}
					renderItem={({ item }) => (
						<TouchableOpacity
						activeOpacity={0.7}
							onPress={() => navigate('SubjectsScreen', { key: item.id })}
						>
							<UniveristyBox
								name={item.name}
								image={item.image}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}
