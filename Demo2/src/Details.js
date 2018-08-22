

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    PanResponder,
} from 'react-native';

export default class Details extends Component {


    static navigationOptions = ({navigation, screenProps}) => ({


            headerTitle: navigation.state.params.name,
            //设置滑动返回的距离
            gestureResponseDistance: {horizontal: 300},

            //是否开启手势滑动返回，android 默认关闭 ios打开
            // gesturesEnabled: true,

            //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
            headerBackTitle: '首页',
            //导航栏的样式
            headerStyle: styles.headerStyle,
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
        }

    );

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0), //设置初始值
            currentAlpha: 1,
            trans: new Animated.ValueXY(),
            backgroundColor: 'red',

        };
        this.panResponder = PanResponder.create({
            //用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递
            onStartShouldSetResponder: () => true,
            //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
            onMoveShouldSetPanResponder: () => true,
            //开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
            onPanResponderGrant: () => {
                this.setState({backgroundColor: 'green'})
            },
            //最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)

            onPanResponderMove: Animated.event([null, {dx: this.state.trans.x, dy: this.state.trans.y}]),
            onPanResponderRelease: () => {
                Animated.spring(this.state.trans, {toValue: {x: 0, y: 0}}).start();
            },
            onPanResponderTerminate: () => {
                Animated.spring(this.state.trans, {toValue: {x: 0, y: 0}}).start();
            }
        });

    }

    startAnimation() {
        var alpha = this.state.currentAlpha;
        this.setState({
            currentAlpha: !alpha,
        })
        Animated.timing(
            this.state.fadeAnim, {toValue: this.state.currentAlpha}
        ).start();
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>

                <Animated.View style={{
                    width: 100, height: 100, borderRadius: 50, backgroundColor: this.state.backgroundColor,
                    transform: [{translateY: this.state.trans.y}, {translateX: this.state.trans.x},],
                }}
                               {...this.panResponder.panHandlers}
                >

                </Animated.View>
            </View>

        );
    }

}
// render() {
//
//     const name = this.props.navigation.getParam('name','title');
//
//     const { getParam } = this.props.navigation;
//     return (
//             <View style={styles.container}>
//                 <TouchableOpacity  onPress={()=>this.props.navigation.navigate('MessageDetail',{name:'消息页面'})}>
//                     <Text style={{color: 'black'}}>{'第'+ this.props.navigation.state.params.index+'页'+ name}</Text>
//
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    // button: {
    //     width: 240,
    //     height: 45,
    //     borderRadius: 5,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: '#4398ff',
    // },
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

    button: {
        width: 120,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    }
});