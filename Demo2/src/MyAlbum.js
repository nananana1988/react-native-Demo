import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    PanResponder,
    FlatList,
    CameraRoll,
    ScrollView,
    Image,
    Dimensions,

} from 'react-native';

var {hight,width} = Dimensions.get('window');


export default class MyAlbum extends Component {


    static  navigationOptions = ({navigation,screenProps}) => ({
            headerTitle:navigation.state.params.title,
            headerStyle:styles.headerS,
            headerTitleStyle:styles.headerTitleS,
            headerTintColor: 'white',


    });

    constructor(props){
        super(props);
        this.state={
            initialPosition:'unknown',
            lastPosition:'unknown',
            photos:null,
        }
    }


    //界面选软
    render(){
        return(
            <View style={styles.containerStyle}>
                <FlatList
                    data={this.state.photos}
                    keyExtractor ={this.keyExtractor}
                    renderItem={this.getView.bind(this)}
                    // ListHeaderComponent ={this.header}
                    // ListFooterComponent ={this.footer.bind(this)}
                    // onRefresh={this.onRefresh}
                    // refreshing={this.state.refreshing}
                    // onEndReached={this.upList}
                    // onEndReachedThreshold={0.2}
                />
            </View>
        );
    }

    componentDidMount(){
        // navigator.geolocation.getCurrentPosition(
        //     (position)=> {
        //         var initialPosition = JSON.stringify(position);
        //     }
        // );

        var _that = this;
        var promise = CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
            .then(r =>{
                var  photos =[];
                let edges = r.edges;
                for(var  i in edges){
                    photos.push(edges[i].node.image.uri);
                }
                this.setState({ photos: photos });
            })
            .catch((err)=>{

            });

        // promise.then(function (data){
        //     var edges = data.edges;
        //     var  photos =[];
        //     for(var  i in edges){
        //         photos.push(edges[i].node.image.uri);
        //     }
        //     _that.setState({
        //         photos:photos
        //     });
        //
        // },function (err) {
        //     alert('获取照片失败！');
        // });


    }

    keyExtractor = (item, index) => item.id;


    getView({item}){
            return (
                <View style={styles.views}>

                    <View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress = { ()=>{ this.props.navigation.navigate('Details', {name:'详情' ,title:'大图浏览',index:item.id})}}
                        >
                            <Image resizeMode="stretch" style={styles.image} source={{uri:item}}/>

                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress = { ()=>{ this.props.navigation.navigate('Details', {name:'详情' ,title:'大图浏览',index:item.id})}}
                        >
                            <Image resizeMode="stretch" style={styles.image} source={{uri:item}}/>

                        </TouchableOpacity>
                    </View>
                </View>
            )






    }



}
const styles=StyleSheet.create(
    {
        containerStyle:{
            flex:1,
        },
        headerS:{
            backgroundColor:'#eb7646',

        },
        headerTitleS:{
            color:'white',
            alignItems:'center',
            fontSize:15,
        },

        image:{
            width:width/2,
            height:width/2,

        },
        views:{
            flexDirection: 'row',
        },

    }
);