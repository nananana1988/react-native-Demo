/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ImageBackground,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
    DrawerItems,
} from 'react-navigation'


// import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Home from './src/Home';
import Type from './src/Type';
import ShopCar from './src/ShopCar';
import Mine from './src/Mine';
import Details from './src/Details';
import MessageDetail from './src/MessageDetail';
import TreePage from './src/TreePage';
import setingInfoPage from './src/setingInfo';
import MyAlbum from './src/MyAlbum'
// import TreePage from './src/TreePage';

const Tab = TabNavigator({
    //每一个页面的配置
    Home: {
        screen: Home,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '首页',

            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#eb7646'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri:'tabbar_home'}}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),

        },
    },
    ShopCar: {
        screen: ShopCar,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '分类',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#eb7646'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '分类',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri:'tabbar_message_center'}}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Type: {
        screen: Type,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '聊天',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#eb7646'},//导航栏的样式


            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '聊天',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri:'tabbar_discover'}}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            //stackNavigator的属性
            headerTitle: '我的',
            gestureResponseDistance: {horizontal: 300},
            headerBackTitle: null,
            headerStyle: {backgroundColor: '#eb7646'},//导航栏的样式
            // headerBackImage:"img_my_navbar",
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },
            //tab 的属性
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={{uri:'tabbar_profile'}}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),


        }
    },

}, {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: false,
    //是否允许在标签之间进行滑动
    swipeEnabled: false,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    //设置Tab标签的属性

    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#eb7646',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 55,
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 13,
            marginTop: -5,
            marginBottom: 5,
        },
        iconStyle: {//图标的样式
            marginBottom: 5,
        }
    },
});



const Stack = StackNavigator({
    Tab: {
        screen: Tab,
    },
    Details: {
        screen: Details,
    },
    MessageDetail:{
        screen:MessageDetail,
    },
    TreePage:{
        screen:TreePage,
    },
    setingInfoPage:{
        screen:setingInfoPage,
    },
    MyAlbum:{
        screen:MyAlbum,
    },

});

export default Drawer = DrawerNavigator({

    Home:{
        screen: Stack,
        navigationOptions:{
            drawerLabel:'首页',
            drawerIcon:({tintColor}) =>(
                <Image
                    source={{uri:'tabbar_home'}}
                    style={[styles.icon,{tintColor:tintColor}]}
                />

            ),

        }
    },
    TreePage:{
        screen:TreePage,
        navigationOptions:{
            drawerLabel:'消息',
            drawerIcon:({tintColor})=>(
                <Image
                    source={{uri:'tabbar_message_center'}}
                    style={[styles.icon,{tintColor:tintColor}]}
                />
            )

        }
    },


},{
    drawerWidth:200,
    drawerPositionL:'left',
    initialRouteName:'Home',
    activeItemKey:'Notifications',
    // contentComponent:contentComponent,
    contentOptions:{
        activeTintColor:'black',
        activeBackgroundColor:'gree',
        inactiveTintColor:'#9294a0',
        inactiveBackgroundColor:'#fff',
        style:{

        },
        onItemPress:(route) => {
            console.log('-------->' + JS);
        }
    },
    contentComponent:props=>{
        return(
            <ScrollView>
              <View>
                <View style={{paddingVertical: 20, paddingHorizontal: 30, height:200, backgroundColor:'#000'}}>

                  <Image
                      source={{uri:'city_guide_head'}}
                      style={{marginTop:50,width:50,height:50}}
                  />
                  <Text style={{color:'#FFF',marginTop:10}}>ser Name</Text>
                </View>
                <DrawerItems {...props} />
              </View>
            </ScrollView>
        )
    }

})

// export default class App extends Component {
//
//     render(){
//         return(
//
//
//         )
//     }
// }
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});