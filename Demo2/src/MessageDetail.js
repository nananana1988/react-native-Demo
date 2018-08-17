import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image,
    Picker,
} from 'react-native';


export default class MessageDetail extends Component {


    constructor(props){
         super(props);
        this.state={
          language:'java',
            positon:0,
        };

    }
//

    static  navigationOptions=({navigation, screenProps})=>({

        headerTitle: navigation.state.params.name,
            //设置滑动返回的距离
            gestureResponseDistance: {horizontal: 300},

        //是否开启手势滑动返回，android 默认关闭 ios打开
        // gesturesEnabled: true,

        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
            headerBackTitle:'首页',
            headerBackImage:{uri:'back-icon.png'},
            //导航栏的样式
            headerStyle:styles.headerStyle,
            //导航栏文字的样式
            headerTitleStyle: styles.headerTitleStyle,
            //返回按钮的颜色
            headerTintColor: 'white',

            //隐藏顶部导航栏
            // header: null,

            //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
            headerRight: (<View/>),

        //设置导航栏左边的视图
        // headerLeft: (<View/>),
    });

    render() {
        const name = this.props.navigation.getParam('name','title');


        return (
            <View  >
                <Text>
                    value:{this.state.language}, position:{this.state.position}
                </Text>
                <Picker
                        onValueChange={(lang,position) => this.setState({
                            language: lang,
                            position:position,
                        })}
                        style={{backgroundColor:'red'}}
                        itemStyle={{color:'green'}}
                        prompt="Picker"
                        modle="dropdown"
                        selectedValue ={this.state.language}
                >
                    <Picker.Item label="Net" value="net"/>
                    <Picker.Item label="ReactNative" value="rn"/>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />

            </Picker>


                <TouchableOpacity
                         onPress={() => this.props.navigation.navigate('TreePage')}
                >
                    <Text>
                        点我一下进入tree
                     </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerStyle: {
        backgroundColor: '#EB3695',
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
})