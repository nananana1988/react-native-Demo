import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    AlertIOS,
    Alert,
} from 'react-native';

export default class Type extends Component {

    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
        }
    }
    setModalVisible(visible){
        this.setState({
            modalVisible:visible,
        })
    }

    render() {
        return (
            <View style={styles.container}  >
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{console.log('mode hidden')}}
                    onShow={()=>{Alert.alert('MODAL SHOW')}}
                >
                    <View  style={{marginTop: 22,backgroundColor:'grey',flex:1}}>
                        <View>
                            <TouchableHighlight
                                onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}
                            >
                                <Text>hide modle</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </Modal>

                <TouchableHighlight
                    onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}
                >
                    <Text>show modle</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    }
});