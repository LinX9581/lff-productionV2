import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, AsyncStorage, ActivityIndicator,Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

let width = Dimensions.get('window').width * 0.85
let height = Dimensions.get('window').height * 0.8
const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		color: '#fff',
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	bottmContainer: {
		height: 60,
		flexDirection: 'row',
	},
	background: {
		height: 800,
		width: 600,
		position: 'absolute',
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
	},
	desc: {
		fontSize: 20,
		color: '#fff',
		backgroundColor: 'rgba(0,0,0,0)',
		textAlign: 'center'
	},
	MainContainer: {
		flex: 1,
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 26,
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
	},
	text: {
		color: "#fff",
		fontSize: 20,
	},
	image: {
		width: width,
		height: height,
		resizeMode: "contain",
	},
});



export default class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show_Main_App: false,
			init: false
		};
	}
	componentDidMount = async () => {
		var value = await AsyncStorage.getItem('@username')
		if (value !== null) {
			this.props.navigation.navigate("Main")
		}
		else {
			console.log("value is null")
			this.setState({
				init:true
			})
		}
	}
	on_Done_all_slides = () => {
		this.setState({ show_Main_App: true });
	};
	on_Skip_slides = () => {
		this.setState({ show_Main_App: true });
	};
	render() {


		if (this.state.init) {

			const slides = [
				{
					key: "k1",
					image: require("../../IMG/Intro/step1.png"),	
					imageStyle: styles.image,
					backgroundColor: "#F7BB64",
				},
				{
					key: "k2",
					image: require("../../IMG/Intro/step2.png"),		
					imageStyle: styles.image,
					backgroundColor: "#F4B1BA",
				},
				{
					key: "k3",
					image: require("../../IMG/Intro/step3.png"),	
					imageStyle: styles.image,
					backgroundColor: "#4093D2",
				},
				{
					key: "k4",
					image: require("../../IMG/Intro/step4.png"),		
					imageStyle: styles.image,
					backgroundColor: "#F7BB64",
				},
				{
					key: "k5",
					image: require("../../IMG/Intro/step5.png"),
					imageStyle: styles.image,
					backgroundColor: "#F4B1BA",
				},
				{
					key: "k6",
					image: require("../../IMG/Intro/step6.png"),		
					imageStyle: styles.image,
					backgroundColor: "#4093D2",
				},
				{
					key: "k7",
					image: require("../../IMG/Intro/step7.png"),	
					backgroundColor: "#F4B1BA",
				},
				{
					key: "k8",
					image: require("../../IMG/Intro/step8.png"),	
					imageStyle: styles.image,
					backgroundColor: "#F7BB64",
				},
			];

			if (this.state.show_Main_App) {
				return (
					<View style={styles.container}>
						<Image style={styles.background} source={require('../../IMG/background_profile.png')} />
						<View style={styles.container}>
							<Image source={require('../../IMG/logo.png')} style={{ height: 120, width: 120, borderRadius: 60 }} />
						</View>
						<View style={styles.container}>
							<Text style={styles.title}>Life For Fun</Text>
							<Text style={styles.desc}>來為生活添加精采與記錄</Text>
						</View>
						<View style={styles.bottmContainer}>
							<TouchableOpacity style={[styles.button, { backgroundColor: '#53423D' }]}
								onPress={() => this.props.navigation.navigate('Login')}
							>
								<Text style={styles.buttonText}
								>
									LOG IN
        					</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.button, { backgroundColor: '#A58987' }]}
								onPress={() => this.props.navigation.navigate('Signup')}
							>
								<Text style={styles.buttonText}>SIGN UP</Text>
							</TouchableOpacity>
						</View>
					</View>

				);
			} else {
				return (
					<AppIntroSlider
						slides={slides}
						onDone={this.on_Done_all_slides}
						showSkipButton={true}
						onSkip={this.on_Skip_slides}
					/>
				);
			}
		}
		else{
			return(
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="small" color="gray" />
            </View>
			)

		}

	}
}
