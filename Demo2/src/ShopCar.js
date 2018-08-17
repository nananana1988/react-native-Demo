import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    AlertIOS,
    ScrollView,
    Image,
    AppRegistry,

} from 'react-native';

 import Dimensions from 'Dimensions';

var {width} = Dimensions.get('window');

export default class ShopCar extends Component {
   static defaultProps = {
       url:'https://news-at.zhihu.com/api/4/news/latest',
   };
   constructor(props){
       super(props);
       this.state={
           data:[], //存储列表的数据
           refreshing:false,//当前的刷新状态
           headerIndex:1, //头部当前图片
           isGetMore:false, //得到更多
           count:0
       };
   }
    render() {

        return (
            <View style={styles.container}>
               <FlatList
                   data={this.state.data}
                    keyExtractor ={this.keyExtractor}
                    renderItem={this.getView.bind(this)}
                   ListHeaderComponent ={this.header}
                   ListFooterComponent ={this.footer.bind(this)}
                     onRefresh={this.onRefresh}
                   refreshing={this.state.refreshing}
                   onEndReached={this.upList}
                   onEndReachedThreshold={0.2}
               />
            </View>
        );


    }



    componentWillUnmount(){
       this.timer&&clearTimeout(this.timer);
    }

    //上拉加载更多
    upList=(dict)=>{
        if(this.state.isGetMore){
           return;
        }else {
            this.setState({
                isGetMore:true,
            })
            var count = this.state.count;
            this.neTimer = setInterval(()=>{
                clearTimeout(this.neTimer);
                this.state.data.push(new this.ItemData('https://pic2.zhimg.com/v2-8f11b41f995ca5340510c1def1c003d1.jpg','上拉加载数据--'+this.state.count,45552+this.state.count));

                this.setState({
                    isGetMore:false,
                    count: count+1,

                });

            },1000)

        }


    }

    keyExtractor = (item, index) => item.id;

    timerStart(){
        var obj = this;
        this.timer = setInterval(function () {
              var currentIndex=obj.state.headerIndex;
             if(currentIndex==5){
                currentIndex=1;
             }else {
                 console.log('headerindex'+obj.state.headerIndex);
                 console.log('currentinde'+currentIndex);

                 currentIndex=obj.state.headerIndex +1;
             }
            obj.setState({
                headerIndex:currentIndex,

            });


            var offsetX= (currentIndex-1)*width;
             console.log('offsetX'+offsetX);
            obj.myScrollView.scrollTo({x:offsetX,y:0,animated:true});

            
        },1000)
    }

    componentDidUpdate(){
        this.getPoint();
    }
    componentDidMount(){

       fetch(this.props.url)
           .then((response)=>response.json())
           .then((response)=>{
                //解析数据
               var json = response['stories'];
               this.setState({

                       data:json,
                   }
               );
           }).catch((error)=>{
           if(error){
               //错误
           }
       })

        this.timerStart();

    }

    getView({item}){
        return(
            <TouchableOpacity
                activeOpacity = {0.5}
                onPress={
                    ()=>{ this.props.navigation.navigate('Details', {name:'详情' ,title:item.title,index:item.id})}
                }
            >
                <View style={styles.itemView}>
                    <Image source={{uri: item.images[0]}} style={styles.image}/>

                    <View style={styles.left}>
                        <Text  style={{marginTop:5,color:'#333333'}}>
                            {item.title}
                        </Text>
                        <View style={styles.content}>
                            <Text style= {{flex: 1, textAlign: 'right'}}>
                                {item.id}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )


    }


    header=()=> {
        console.log(this.state.headerIndex);

        return (
           <View style={{height:100,backgroundColor:'green'}}>
               <ScrollView ref={(ref)=>this.myScrollView=ref}
                           pagingEnabled={true}
                   showHorizontalScrollIndicator={false}
                   horizontal={true}
               >
                   {this.renderChildView()}

               </ScrollView>
               <View style={styles.piontViewStyle}>
                   {this.getPoint()}
               </View>
           </View>

        );

    }

    getPoint=()=>{
        var points=[];
        for (var i=1;i<6;i++){
             points.push(
                 <View key={i}
                     style={{
                         backgroundColor:this.state.headerIndex==i?'orange':'white',
                         width:6,
                         height:6,
                         marginRight:5,
                         borderRadius:3,}}>
                 </View>
             )
        }
        return points;
    }
    renderChildView=()=>{

        var allChild=[];
        var colors = ['red','green','blue','yellow','orange','purple'];

        for (var i=1;i< 6;i++){
            allChild.push(
                <Image key={i}
                      style={{backgroundColor:colors[i],width:width,height:120}}
                       source={{uri:'img_0'+i+'.png'}}
                >
                </Image>
            )
        }
        return allChild;

    }



    footer(){
        var text = this.state.isGetMore?'正在加载更多':'上拉加载更多';
        return (
            <View >

                <Text
                    style={{
                backgroundColor: '#4398ff',
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 44,
                lineHeight:44,

            }}
                 >
                {text}
                </Text>

            </View>
        )

    }

    onRefresh=()=>{
      //设置刷新状态
        this.setState({
            refreshing:true,
        });
        var count = this.state.count;

        const  timer = setTimeout(()=>{
               //一段时间后的回调函数
            //清楚之前的timer
            clearTimeout(timer);
            this.state.data.unshift(new this.ItemData('https://pic2.zhimg.com/v2-8f11b41f995ca5340510c1def1c003d1.jpg','下拉刷新数据--'+this.state.count,45552+this.state.count));
            this.count++;
            this.setState({
                refreshing:false,
                count:count+1,
            });

        },1500);

    }
    ItemData(images,title,id){
        this.images =new Array(images);
        this.title = title;
        this.id = id;
    }


}

const styles = StyleSheet.create({
    container: {
    },



    pointStyle: {


    },

    piontViewStyle:{
        backgroundColor:'#000',
        height:20,
        width:width,
        position:'absolute',
        bottom:0,
        opacity:0.5,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',

    },
    itemView:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent  :'flex-start',
        marginBottom:10,

    },
    image:{
        marginLeft:10,
        marginTop:5,
        marginBottom:5,
        width:90,
        height:90,
        borderRadius:10,
    },

    left: {
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 8,
        flexDirection: 'column',
    },
    //让 Text 水平方向充满容器
    content: {

         bottom: 10,
         marginRight: 10,

         position: 'absolute',
        flexDirection:'row',
         justifyContent: 'flex-end',

        lineHeight:30,

        // bottom: 10,
        // marginRight: 16,
        // position: 'absolute',
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
    }


});