import React, { useReducer } from "react";
import patternContext from "./PatternContext";
import PatternReducer from "./PatternReducer";

function ProvidePattern({children}) {
    const initialState = {
        currentPattern: [],
        pattern: [],
        video: "",
        value: 0,
        width: 0,
        height: 0,
        johnnie: "",
        default_increment: 0
    }

    const [state, dispatch] = useReducer(PatternReducer, initialState);

    const addPattern = (val) => {
        dispatch({type: "ADD_TO_PATTERN", payload: {value: val}});
    }

    const resetPattern = (val) => {
        dispatch({type: "RESET_PATTERN", payload: {}});
    }

    const incrementValue = (value) => {
        dispatch({type: "INCREMENT_VALUE", payload: {value}});
    }

    const resetValue = () => {
        dispatch({type: "RESET_VALUE", payload: {}})
    }

    const setVideo = (value) => {
        dispatch({type: "SET_VIDEO", payload: {video: value}})
    }

    const setWidth = (value) => {
        dispatch({type: "SET_WIDTH", payload: {width: value}});
    }

    const setHeight = (value) => {
        dispatch({type: "SET_HEIGHT", payload: {height: value}});   
    }

    const setJohnnie = (val) => {
        dispatch({type: "SET_JOHNNIE", payload: {val}});
    }

    const setCurrentPattern = (val) => {
        dispatch({type: "SET_CURRENT_PATTERN", payload: {index: val}});
    }

    const removeFirst = () => {
        dispatch({type: "REMOVE_FIRST_CURRENT_PATTERN", payload: {}});
    }

    const default_increment = (val) => {
        dispatch({type: "DEFAULT_INCREMENT", payload: val});
    }

    return (
    <patternContext.Provider value={{
        pattern: state.pattern,
        addPattern,
        resetPattern,
        incrementValue,
        resetValue,
        value: state.value,
        videoPath: state.video,
        setVideo,
        setWidth,
        width: state.width,
        height: state.height,
        setHeight,
        johnnie: state.johnnie,
        setJohnnie,
        setCurrentPattern,
        currentPattern: state.currentPattern,
        removeFirst,
        default_increment,
        increment: state.default_increment
    }}>
        {children}
    </patternContext.Provider>
    )
}

export {ProvidePattern};