import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AlertIOS,
    Image,
    ScrollView,
    Modal,
    Button,
    Animated,
    Easing,

} from 'react-native';

 import Video from 'react-native-video';

 import Dimensions from "Dimensions";

 var {width,height} = Dimensions.get('window')


export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            province:'北京',
            city:'上海',
            rate:1,
            videosUrl:['new.mp4','http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4','new2.mp4'],
            currentPlayurl:'new.mp4',
            modelIsShow:false,
        };

    }
    static navigationOptions = ({navigation, screenProps}) => ({



            //设置滑动返回的距离
            gestureResponseDistance: {horizontal: 300},

            //是否开启手势滑动返回，android 默认关闭 ios打开
            // gesturesEnabled: true,

            //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
            //导航栏的样式

            headerStyle: styles.headerStyle,
            //导航栏文字的样式
            headerTitleStyle: styles.headerTitleStyle,
            //返回按钮的颜色
            headerTintColor: 'white',

            //隐藏顶部导航栏
            // header: null,

            //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
            headerRight:(

                <TouchableOpacity style={{height:30,width:50,marginRight:20}}
                                  onPress={()=>navigation.state.params.rightPress()}
                >
                           <Text style={{lineHeight:30,textAlign:'center',flexDirection:'row',color:'white'}}>
                               上海
                           </Text>
            </TouchableOpacity>
            ),

            //设置导航栏左边的视图
            headerLeft: (
                <View>
                    <TouchableOpacity style={{height:40,width:40,marginLeft:20}}
                                      onPress={()=>navigation.navigate('DrawerOpen')}
                    >
                        <Image source={{uri:'city_guide_head'}}
                               style={{height:30,width:30,marginTop:5}}
                               tintColor='white'
                        />
                    </TouchableOpacity>
                </View>),
        }

    );

    componentDidMount(){
        this.props.navigation.setParams({rightPress:this.clickFinishButton})

    }
    clickFinishButton=()=>{

       AlertIOS.alert('导航右键点击');
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator = {false}
                >
              <VideoItem  url={this.state.videosUrl[0]}
                          key='1'
                          CurrentUrl={this.CurrentUrl.bind(this)}
                          // vedioClick = {this.vedioClick.bind(this)}
              />
                <VideoItem  url={this.state.videosUrl[1]}
                            key='2'
                            CurrentUrl={this.CurrentUrl.bind(this)}

                    // vedioClick = {this.vedioClick.bind(this)}

                />
                <VideoItem  url={this.state.videosUrl[2]}
                            key='3'
                            CurrentUrl={this.CurrentUrl.bind(this)}

                    // vedioClick = {this.vedioClick.bind(this)}

                />
                </ScrollView>

              <PlayVideoModle
                  url={this.state.currentPlayurl}
                  modelShow={this.state.modelIsShow}
                  showPlayView={this.showPlayView.bind(this)}
              >

              </PlayVideoModle>
            </View>

        );

    }

    showPlayView(isShow){
        this.setState({
            modelIsShow:isShow
        })
    }
    CurrentUrl(url){

        this.setState({
            currentPlayurl:url,
            modelIsShow:true
        })

    }

    vedioClick(index){
       var  url =this.state.videosUrl[index];
        this.setState({
            currentPlayurl:url,
            // modalVisible:true,
        })

    };
    onAudioBecomingNoisy=()=>{

    };
    onAudioFocusChanged=()=>{

    };
    onLoad=()=>{
        AlertIOS.alert('onLoad')


    };
    loadStart=()=>{
        AlertIOS.alert('loadStart')

    };
    onProgress=()=>{
        // AlertIOS.alert('onprogress')

    };
    setDuration=()=>{
        // AlertIOS.alert('duration')

    };
    setTime=()=>{
        // AlertIOS.alert('time')

    };
    onEnd=()=>{
        // AlertIOS.alert('end')

    };
    videoError=(error)=>{
       console.log('error');

    };
}

class PlayVideoModle extends Component{
     constructor(props){
         super(props)
         this.state={
             // videoUlr:this.props.url,
             videoViewW:320,
             videoViewH:100,

             paused:false,

         }
     }

     render(){
         var modelW ;
         var modelH ;
         return(

             <Animated.View >
                 <Modal
                     animationType='none'
                     visible={this.props.modelShow}
                     transparent={true}
                     onShow={this.modalShow.bind(this)}
                     onRequestClose={()=>{
                     }}
                 ><View
                     style={styles.modalStyles}
                 >
                     <TouchableOpacity onPress={()=>{
                         this.props.showPlayView(false);

                     }} style={styles.fullScreenVideo}

                     >
                     <Video
                         ref={(ref) => this.videoPlayer = ref}
                         source={{uri:this.props.url}}
                         style={styles.fullScreenVideo}
                         rate={1}                          // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                         paused={false}
                         volume={1}                   // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                         muted={false}                  // true代表静音，默认为false.
                         resizeMode='cover'       // 视频的自适应伸缩铺放行为，
                         onLoad={this.onLoad}                       // 当视频加载完毕时的回调函数
                         onLoadStart={this.loadStart}            // 当视频开始加载时的回调函数
                         onProgress={this.onProgress}   //  进度控制，每250ms调用一次，以获取视频播放的进度
                         onEnd={this.onEnd}             // 当视频播放完毕后的回调函数
                         onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                         onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                         onAudioFocusChanged={this.onAudioFocusChanged}
                         repeat={true}

                     />
                     </TouchableOpacity>
                 </View>

                 </Modal>
             </Animated.View>

         )
     }
    modalShow(){

        //  this.setState({
        //     modeW:modelW,
        //     modeH:modelW,
        // })
        // Animated.timing(this.state.videoViewW, {
        //     toValue: this.state.modeW,
        //     duration: 1000,
        //     easing: Easing.linear,// 线性的渐变函数
        // }).start();
        // Animated.timing(this.state.videoViewH, {
        //     toValue: this.state.modeH,
        //     duration: 1000,
        //     easing: Easing.linear,// 线性的渐变函数
        // }).start();
    }



}


class VideoItem extends  Component{

    constructor(props){
        super(props)
        this.state={
            paused:false,
            modalVisible:false,
            rate:0,

        }
    }

    controlPlay(){

        var paused = this.state.paused;
        var modalVisible = this.state.modalVisible;

        // this.setState({
        //     paused:!paused,
        // })


        this.props.CurrentUrl(this.props.url)

    }

    render(){
        return(
            <View style={styles.backgroundVideo}>
            <TouchableOpacity onPress={()=>{
                // this.controlPlay();
            }}>
                <Video
                    ref={(ref) => this.videoPlayer = ref}
                    source={{uri:this.props.url}}
                    style={styles.backgroundVideo}
                    rate={0}                          // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                    paused={0}
                    volume={1}                   // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                    muted={false}                  // true代表静音，默认为false.
                    resizeMode='cover'       // 视频的自适应伸缩铺放行为，
                    onLoad={this.onLoad}                       // 当视频加载完毕时的回调函数
                    onLoadStart={this.loadStart}            // 当视频开始加载时的回调函数
                    onProgress={this.onProgress}   //  进度控制，每250ms调用一次，以获取视频播放的进度
                    onEnd={this.onEnd}             // 当视频播放完毕后的回调函数
                    onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                    repeat={true}

                >
                </Video>

                <TouchableOpacity  onPress={()=>{
                    this.controlPlay();
                }}>
                    <Image
                        source={{uri:'vedio.png'}}
                        style={styles.palyBtn}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
            </View>

        )

        onAudioBecomingNoisy=()=>{

        };
        onAudioFocusChanged=()=>{

        };
        onLoad=()=>{
            AlertIOS.alert('onLoad')


        };
        loadStart=()=>{
            AlertIOS.alert('loadStart')

        };
        onProgress=()=>{
            // AlertIOS.alert('onprogress')

        };
        setDuration=()=>{
            // AlertIOS.alert('duration')

        };
        setTime=()=>{
            // AlertIOS.alert('time')

        };
        onEnd=()=>{
            // AlertIOS.alert('end')

        };
        videoError=(error)=>{
            console.log('error');

        };

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
    },
    backgroundVideo: {
        width:350,
        height:200,

    },
    palyBtn:{
        height: 50,
        width: 50,
        position:'absolute',
        bottom:75,
        alignSelf:'center',
    },

    fullScreenVideo:{
        width:width,
        height:250,
        alignSelf:'center',

    },
    modalStyles:{
        flex:1,
        width:width,
        height:250,
        backgroundColor:'rgba(0,0,0,0.5)',
        flexDirection:'row',

    },

});