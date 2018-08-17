import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    PanResponder,
} from 'react-native';


export default class Type extends Component {


    constructor(props){
        super(props);
        this.state={
            fadeAnim: new Animated.Value(0), //设置初始值
            currentAlpha: 1,
            trans: new Animated.ValueXY(),
            backgroundColor:'red',

        };
        this.panResponder=PanResponder.create({
            //用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，当返回true的时候则可以进行之后的事件传递
            onStartShouldSetResponder:()=>true,
            //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
            onMoveShouldSetPanResponder:()=>true,
            //开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
            onPanResponderGrant:()=>{ this.setState({backgroundColor:'green'})},
            //最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)

            onPanResponderMove: Animated.event([null,{dx:this.state.trans.x,dy:this.state.trans.y}]),
            onPanResponderRelease:()=>{
                Animated.spring(this.state.trans,{toValue:{x:0,y:0}}).start();
            },
            onPanResponderTerminate:()=>{
                Animated.spring(this.state.trans,{toValue:{x:0,y:0}}).start();
            }
        });

    }

    startAnimation(){
        var alpha = this.state.currentAlpha;
        this.setState({
            currentAlpha:!alpha,
        })
        Animated.timing(
            this.state.fadeAnim,{toValue:this.state.currentAlpha}
        ).start();
    }

    componentDidMount(){

    }
    render() {
        return (
            <View style={styles.container}>
                {/*<Animated.Text*/}
                    {/*style={{*/}
                        {/*opacity:this.state.fadeAnim,*/}
                        {/*transform:[{translateY:this.state.fadeAnim.interpolate({*/}
                            {/*inputRange:[0,1],*/}
                            {/*outputRange:[60,0],*/}
                        {/*},)},*/}
                            {/*{scale:this.state.fadeAnim},*/}
                        {/*],*/}
                    {/*}}*/}
                {/*>*/}
                {/*欢迎你来到 React native 开发*/}
                {/*</Animated.Text>*/}
                {/*<TouchableOpacity*/}
                    {/*onPress = {()=> this.startAnimation()}*/}
                    {/*style={{width:200,height:50,backgroundColor:'#4073ab',borderRadius:5,*/}
                            {/*}}*/}

                {/*>*/}
                 {/*<Text style={{lineHeight:50,textAlign:'center',}}>*/}
                  {/*start animation*/}
                 {/*</Text>*/}
                {/*</TouchableOpacity>*/}

                <Animated.View style={{width:100,height:100,borderRadius:50,backgroundColor:this.state.backgroundColor,
                    transform:[{translateY:this.state.trans.y},{translateX:this.state.trans.x},],
                }}
                    {...this.panResponder.panHandlers}
                    >

                </Animated.View>
            </View>

        );
    }
    componentUnMount
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