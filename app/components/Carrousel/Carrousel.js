import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import CarouselItem from './CarrouselItem'
import {SafeAreaView} from 'react-navigation'
import Layout from "../../../constants/Layout";

const { width, heigth } = Dimensions.get('window')
let flatList

function infiniteScroll(dataList){
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function() {
        scrolled ++
        if(scrolled < numberOfData)
        scrollValue = scrollValue + width-20

        else{
            scrollValue = 0
            scrolled = 0
        }        
        this.flatList.scrollToOffset({ animated: true, offset: scrollValue})
        
    }, 6000)
}

const Carousel = ({ data }) => {
    const scrollX = new Animated.Value(0)
    let position = Animated.divide(scrollX, width)
    const [dataList, setDataList] = useState(data)

    useEffect(()=> {
        setDataList(data)
        infiniteScroll(dataList)
    })
    renderItem=({ item }) => (<CarouselItem item={item} />)

    if (data && data.length) {
        return (
            <View style={{width: width-20}}>
                <View style={styles.flat}>
                    <FlatList data={data}
                        ref = {(flatList) => {this.flatList = flatList}}
                        keyExtractor={(item, index) => 'key' + index}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}                        
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }]
                        )}
                        windowSize={10}
                        style =  {{ width:width-20}}
                        
                    />
                </View>               

                <View style={styles.abso}>
                    <View style={styles.dotView}>
                        {data.map((_, i) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            })
                            return (
                                <Animated.View
                                    key={i}
                                    style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                                />
                            )
                        })}

                    </View>
                </View>
                
            </View>
        )
    }

    console.log('Please provide Images')
    return null
}

const styles = StyleSheet.create({
    flat:{
        height: Layout.window.height/3 +20,
    },
    abso:{
        height: 30,
        width: '100%',        
        top: Layout.window.height/3+10,         
        position:'absolute', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotView: {              
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Carousel