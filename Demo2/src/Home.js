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
} from 'react-native';

 import Video from 'react-native-video';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            province:'北京',
            city:'上海',
            rate:1,
            videosUrl:['new.mp4','http://124.129.157.208:8810/SD/2017qingdao/xiaoxueEnglish/grade3/b/1.mp4','new2.mp4'],
            currentPlayurl:'new.mp4'
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
                          // vedioClick = {this.vedioClick.bind(this)}
              />
                <VideoItem  url={this.state.videosUrl[1]}
                            key='2'
                            // vedioClick = {this.vedioClick.bind(this)}

                />
                <VideoItem  url={this.state.videosUrl[2]}
                            key='3'
                            // vedioClick = {this.vedioClick.bind(this)}

                />
                </ScrollView>


              {/*<VideoModal style={{backgroundColor:'yellow',width:350,height:500}}*/}
                  {/*url={this.state.currentPlayurl}*/}
                  {/*modalVisible={false}*/}
              {/*/>*/}




            </View>
        );

    }

    vedioClick(index){
       var  url =this.state.videosUrl[index];
        this.setState({
            currentPlayurl:url,
            modalVisible:true,
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

class VideoItem extends  Component{

    constructor(props){
        super(props)
        this.state={
            paused:false,
            modalVisible:false,
        }
    }

    controlPlay(){

        var paused = this.state.paused;
        var modalVisible = this.state.modalVisible;
        this.setState({
            paused:!paused,
        })
        // this.props.vedioClick(this.props.key)

    }

    render(){
        return(
            <View style={styles.backgroundVideo}>
            <TouchableOpacity onPress={()=>{
                this.controlPlay();
            }}>
                <Video
                    ref={(ref) => this.videoPlayer = ref}
                    source={{uri:this.props.url}}
                    style={styles.backgroundVideo}
                    rate={1}                          // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                    paused={this.state.paused}
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

        )

    }
}

class VideoModal extends  Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible:this.props.modalVisible,
        }
    }
    render(){

        return(
            <Modal style={{ width:359, height:400}}
                animationType={'fade'}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setState({
                    modalVisible:false,
                })}
            >
                <VideoItem url={this.props.url}/>
            </Modal>
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

});