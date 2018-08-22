import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    ImageBackground,
    LayoutAnimation,
    Modal,
    TextInput,
    AlertIOS,
    Animated,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;


export default class Mine extends Component {

    static  navigationOptions=({navigation,screenProps})=>({



        //设置滑动返回的距离
        gestureResponseDistance: {horizontal: 300},

        //是否开启手势滑动返回，android 默认关闭 ios打开
        gesturesEnabled: false,

        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        // headerBackTitle: '',
        //导航栏的样式
        // headerStyle: styles.headerStyle,
        // //导航栏文字的样式
        // headerTitleStyle: styles.headerTitleStyle,
        //返回按钮的颜色
        headerTintColor: 'white',

        //隐藏顶部导航栏
        header: null,

        //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (<View/>),

        //设置导航栏左边的视图
        // headerLeft: (<View/>),
    });

      constructor(props){
          super(props);
          this.state={
              refreshing:false,
              data:[{id:'0', icon:'ic_my_photos',title:'我的照片'},{icon:'ic_my_collect',title:'我的收藏',id:'1'},{icon:'ic_my_upload',title:'上传食物数据',id:'2'}],
              loginPageShow:false,
              myHeaderUri: {uri:'ic_my_nobody'},

          }
      }


    render() {
        return (
            <View >
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.getRenderItem}
                    ListHeaderComponent={this.getHeader.bind(this)}
                    // ListFooterComponent:{this.getFooter}
                    // onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}
                    // onEndReached={this.upList} 上拉加载更多
                    // onEndReachedThreshold={0.2}
                >
                </FlatList>
                <LoginView
                    cancelLoginModel= {this.cancelLoginModel.bind(this)}
                    startLogin={this.startLogin.bind(this)}
                    loginModalVisible={this.state.loginPageShow}
                />


            </View>
        );
    }

    keyExtractor = (item, index) => item.id;
    //获取列表cell
    getRenderItem=({item ,index})=>{
        return(
            <TouchableOpacity style={styles.backgroundStyle}
                              onPress={this.selectCell.bind(this,index)}
            >
            <View style={styles.cellStyle}>
                <View style={styles.leftStyle}>
                   <Image
                       source={{uri:item.icon}}
                       style={styles.iconStyle}
                   />
                    <Text style={styles.textStyle}>
                        {item.title}
                    </Text>
                </View>
                <View>
                    <Image
                        source={{uri:'ic_bullet_dark'}}
                        style={styles.rightArrowStyle}
                    />
                </View>
            </View>
            </TouchableOpacity>

        )
    };

    selectCell(index){
        switch(index){
            case 0:{
                this.props.navigation.navigate('MyAlbum',{title:'我的相册'});

            }break;
            case 1:{

            }break;
            case 2:{

            }break;
            default:{

            }
        };
        // AlertIOS.alert('index'+index);
    }
    //创建头文件
    getHeader(){
        return(
            <View  style={{flexDirection:'row', width:width,height:240,backgroundColor:'red',marginBottom:20}}
            >
                    <ImageBackground
                    source={{uri:'img_my_head'}}
                    style={{width:width,height:240}}
                >
                <View style={{alignItems:'center',marginTop:40}}>

                    <View style={styles.setStyle}>
                        <Text style={{color:'#fcfffa',fontSize:20}}>
                            我的
                        </Text>
                        <TouchableOpacity onPress={this.setingInfofunce.bind(this)}
                                           style={{position:'absolute',right:30}}>
                        <Image style={{width:20,height:20}}
                               source={{uri:'ic_my_setting'}}
                        />
                        </TouchableOpacity>


                    </View>
                    <TouchableOpacity onPress={this.selectHeader.bind(this)}>
                        <Image source={this.state.myHeaderUri}
                               style={{width:80,height:80,marginTop:20,borderRadius:40,borderWidth:3,borderColor:'white'}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop:20}}
                                      onPress={()=>this.logine()}
                    >
                        <Text style={{color:'white', borderColor:'white', borderWidth:1,borderRadius:5, width:80,height:30,lineHeight:25,textAlign:'center'}}>
                            点击登录
                        </Text>
                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        )

    }
    selectHeader(){

        const Options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            allowsEditing:true,
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从相册选择图片',
            cancelButtonTitle:"取消",
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(Options,(response => {
            console.log('Response'+response);
            if (response.didCancel){

                AlertIOS.alert('取消选择图片');
            }
            else if(response.error){
                AlertIOS.alert('选择图片错误');
            }
            else if(response.customButton){
                AlertIOS.alert('选择了custombutton');
            }else {
                let source ={uri: response.uri}
                this.setState({
                    myHeaderUri:source,
                })
            }

        }))

    }
   //创建文件尾
    getFooter(){

    };
    // 下拉刷新
    onRefresh(){

    };

    //点击设置按键
    setingInfofunce(){
         //跳转到设置界面
        this.props.navigation.navigate('setingInfoPage')

    };

    cancelLoginModel(isLogined){
        // AlertIOS.alert('关闭登陆模块');
        this.setState({
            loginPageShow:isLogined,
        })
    }

    //开始登陆
    startLogin(userName,pwd){
        this.setState({
            loginPageShow:false,
        });
    }
    //点击登录
    logine(){
       this.setState({
           loginPageShow:true
       })

    };


}


//创建登录页面
class LoginView extends  Component{
     constructor(props){
         super(props);
         this.state={
             isOnFouce:false,
             inputName:'',
             inputPwd:'',
         }
     }
    render(){
        return(
            <Modal
                animationType="slide"
                visible={this.props.loginModalVisible}
                transparent={true}
                onRequestClose={()=>this.CloseLoginMode()}
            >
                <View
                    style={styles.modalStyle}
                >

                    <View
                        style={styles.loginViewStyle}
                    >
                        <TouchableOpacity
                            onPress={this.cancelLogin.bind(this)}
                            style={styles.cancelStyle}
                        >
                            <Image
                                source={{uri:'ic_report_delete'}}
                                style={{width:25,height:25}}
                            />
                        </TouchableOpacity>
                    <Text style={styles.titleStyle}>
                        欢迎登录
                    </Text>
                    <View style={styles.nameStyle}>
                        <Image source={{uri:'icon_account'}}
                               style={styles.userIconStyle}
                        />
                        <TextInput
                            ref={(view)=>this.nameInput =view}
                            style={styles.inputStyle}
                            placeholder='请输入用户名/手机号'
                            onFocus={this.inputOnfocus.bind(this)}
                            onChangeText={(text)=>this.setState({inputName:text})}

                        >
                        </TextInput>
                    </View>
                    <View style={styles.nameStyle}>
                        <Image source={{uri:'icon_password'}}
                               style={styles.userIconStyle}

                        />
                        <TextInput
                            ref={(view)=>this.pwdInput =view}
                            style={styles.inputStyle}
                            placeholder='请输入密码'
                            onFocus={this.inputOnfocus.bind(this)}
                            secureTextEntry={true}
                            onChangeText={(text)=>this.setState({pwdInput:text})}
                        >
                        </TextInput>
                    </View>
                    <View
                        style={styles.findPwdStyle}
                    >
                        <TouchableOpacity>
                            <Text style={styles.findTextStyle}>
                                找回密码
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.longinStyle}
                                          onPress={()=>this.startLogin()}
                        >
                            <Text style={styles.loginTextStyle}>
                                登录
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.longinStyle}>
                            <Text style={styles.loginTextStyle} >
                                立即注册
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
        );

    }

    CloseLoginMode(){
        this.props.cancelLoginModel(false);

    }
    inputOnfocus(){
       this.setState({
           isOnFouce:true

       })
    }

    cancelLogin=()=>{
        // AlertIOS.alert('关闭登陆模块');
        this.props.cancelLoginModel(false);

    }
    startLogin(){
        this.props.startLogin(this.state.inputName, this.state.pwdInput);

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
    iconStyle:{
        width:25,
        height:25,
        marginLeft:20,
    },
    textStyle:{
       fontSize:15,
        color:'#7d7e86',
        width:200,
        height:44,
        lineHeight:44,
        marginLeft:10,
    },
    backgroundStyle:{
        backgroundColor:'#68676d',
    },
    cellStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',

    },
    leftStyle:{
        flexDirection:'row',
        alignItems:'center',

    },
    rightArrowStyle:{
        marginRight:20,
        width:10,
        height:10,

    },
    setStyle:{
        flexDirection:'row',
        width:width,
        justifyContent:'center',
    },



    modalStyle:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',

    },
    cancelStyle:{
        width:30,
        height:30,
        position:'absolute',
        right:-10,
        top:-10,

    },
    loginViewStyle:{
        width:300,
        height:300,
        backgroundColor:'white',
        alignItems:'center',
        borderRadius:6,
    },
    titleStyle:{
        marginBottom:10,
        fontSize:20,
        color:'#5d607a',
        marginTop:20,
    },
    inputStyle:{
        width:240,
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'#a4a09a',
        height:40,
        paddingLeft:40,

    },
    nameStyle:{
        height:40,
        marginTop:10,

    },
    userIconStyle:{
        width:25,
        height:25,
        position:'absolute',
        left:5,
        marginTop:7,

    },
    findPwdStyle:{
        marginTop:10,
        width:250,
        flexDirection:'row',
        justifyContent:'flex-end',
        height:30,

    },
    findTextStyle:{
        fontSize:14,
        color:'#4389c6',
    },
    longinStyle:{
        width:200,
        height:40,
        backgroundColor:'#eb7646',
        borderRadius:6,
        color:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    loginTextStyle:{
        color:'white',
        fontSize:15,
    },
});