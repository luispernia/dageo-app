import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, ScrollView, Button, Easing } from "react-native"
import Constants from '../Constants';
import Symbol from './Symbol';
import patternContext from '../services/context/PatternContext';

export default class Reel extends Component {

    static contextType = patternContext;

    constructor(props) {
        super(props)
        this.symbols = "AHCDGAKCJGFFEHDBIL";
        this.reelSymbols = this.symbols.repeat(Constants.REELS_REPEAT).split("");
        this.myRef = React.createRef();
        this.symbolRefs = [];
        var value = 0;
        switch (props.index) {
            case 0:
                value = -13350;
                break;
            case 1:
                value = -10650;
                break;
            case 2:
                value = -19869;
                break;

            default:
                break;
        }
        this.state = {
            scroll: new Animated.Value(value),
            scrollPos: new Animated.Value(0),
            width: null,
            width_renewed: null,
            move: 0,
            toPos: new Animated.Value(0),
            opac: new Animated.Value(1)
        }
    }

    changePos(pos) {
        Animated.timing(
            this.state.toPos,
            {
                toValue: pos,
                duration: 500,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true
            }
        ).start();
    }

    spinNow(val, pos, type, x) {
        // Scrolling
        
        Animated.timing(
            this.state.scroll,
            {
                toValue: (x * -1),
                duration: 4000 ,
                easing: Easing.inOut(Easing.exp),
                useNativeDriver: true,
            }
        ).start(({finished}) => {
            if (type) {
                this.context.setJohnnie(type.toLowerCase());
            }
        })
    }

    render() {
        return (
            <View style={styles.reel}>
                <Animated.View ref={this.myRef} style={[styles.scroll,{ transform: [{ translateX: this.state.scroll}] }]} >
                    {this.reelSymbols.map((e, i) => {
                        return <Symbol width={this.props.width} height={this.props.height} symbol={e} opac={this.state.opac} move={this.state.toPos} key={i} index={i} />
                    })}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reel: {
        backgroundColor: "white",
        flex: 1
    },
    ok: {
        flexDirection: 'row',
        flex: 1
    },
    scroll: {
        flex: 1,
        flexDirection: "row",
    }
})
