import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';


import Dimensions from 'Dimensions';
var width = Dimensions.get('window').width;

export default class setingInfoPage extends Component {

    constructor(props){
        super(props);
        this.state={
             data:[{id:0,title:'账号安全',detail:'未认证'},{id:1, title:'清楚缓存',detail:'清楚缓存'},
                 {id:2,title:'给我们一个建议',detail:''},{id:3,title:'评个分吧',detail:''},{id:4,title:'将食物库分享给朋友们',detail:''},
                 {id:5,title:'HealthKit设置',detail:''}],


        }
    }

    static navigationOptions = ({navigation, screenProps})=>({
        headerTitle:'设置',
        headerStyle:styles.headerStyles,
        headerTitleStyle:styles.headerTitleStyles,
        headerTintColor:'white',

    });
    // componentWillUnMount(){
    //
    // }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor ={this.keyExtractor}
                    renderItem={this.getView.bind(this)}
                    ListHeaderComponent ={this.header}
                    ListFooterComponent ={this.footer.bind(this)}
                    // onRefresh={this.onRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.upList}
                    // onEndReachedThreshold={0.2}
                />

            </View>

        );
    }

    kekeyExtractor=(item,key)=>item.id;
    header=()=>{
        return(
            <View
                style={{height:20, backgroundColor:'#ddd'}}
            />
            )


    };
    getView=({item})=>{
        return(
            <View style={styles.cellStyle}>
                <TouchableOpacity onPress={this.selectCell.bind(this)}>

                <View style={styles.interViewStyle}>

                    <Text style={styles.titleStyle}>
                        {item.title}
                    </Text>
                    <View style={styles.rightStyle}>
                        <Text style={{color:'#9c9c9c'}}>
                            {item.detail}
                        </Text>
                        <Image style={styles.imgStyle}
                               source={{uri:'ic_bullet_dark'}}
                        />
                    </View>


                </View>
            </TouchableOpacity>
                <View style={{marginLeft:20, height:0.5,backgroundColor:'#cbcbcb'}}>
                </View>

            </View>

        )

    };
    selectCell(){

    };
    footer=()=>{
         return(
            <View style={styles.footerStyle}>
                <TouchableOpacity style={styles.cancelBtnStyle}>
                    <Text style={styles.textStyle}>
                        退出登陆
                    </Text>
                </TouchableOpacity>
                <Text style={styles.versionStyle}>
                    当前版本：2.1
                </Text>
            </View>
        )
    }
    // onRefresh(){
    //
    // }
    // upList(){
    //
    // }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    headerStyles:{
       backgroundColor:'#eb7646'
    },
    headerTitleStyles: {
        color:'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
    footerStyle:{

        justifyContent:'center',
        alignItems:'center',
        marginTop:20,

    },
    cancelBtnStyle:{
        width:300,
        height:44,
        borderRadius:3,
        backgroundColor:'#eb7646',
        marginBottom:10,
    },
    textStyle:{
        textAlign:'center',
        height:44,
        lineHeight:44,
        color:'white',

    },
    versionStyle:{
        color:'#747474',
        fontSize:14,
    },

    cellStyle:{
        width:width,
        height:44,
    },

    interViewStyle:{
        height:44,
        borderColor:'#ddd',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:20,

    },
    titleStyle:{
        fontSize:13,
        color:'#414141',
        width:200,
        lineHeight:44,

    },
    rightStyle:{
        marginLeft:20,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:20,

    },
    imgStyle:{
        marginLeft:10,
        width:5,
        height:10,

    },
});