import {
    ADD_TO_PATTERN,
    RESET_PATTERN,
    INCREMENT_VALUE,
    RESET_VALUE,
    SET_VIDEO,
    SET_WIDTH,
    SET_HEIGHT,
    SET_JOHNNIE,
    SET_CURRENT_PATTERN,
    REMOVE_FIRST_CURRENT_PATTERN,
    DEFAULT_INCREMENT
} from "../actions";

export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_TO_PATTERN:
            return {
                ...state,
                pattern: [...state.pattern, payload.value]
            }
        case RESET_PATTERN:
            return {
                ...state,
                pattern: []
            }
        case INCREMENT_VALUE:
            console.log(state.value, "value")
            return {
                ...state,
                value: state.value + state.default_increment
            }
        case RESET_VALUE:
            return {
                ...state,
                value: 0
            }
        case SET_VIDEO:
            return {
                ...state,
                video: payload.video
            }
        case SET_WIDTH:
            return {
                ...state,
                width: payload.width
            }
        case SET_HEIGHT:
            return {
                ...state,
                height: payload.height
            }
        case SET_JOHNNIE:
            return {
                ...state,
                johnnie: payload.val
            }
        case SET_CURRENT_PATTERN:
            return {
                ...state,
                currentPattern: payload.index
            }
        case REMOVE_FIRST_CURRENT_PATTERN:
            var removed = state.currentPattern;
            removed.shift();
        return {
            ...state,
            currentPattern: removed 
        }
        case DEFAULT_INCREMENT: 
            return {
                ...state,
                default_increment: payload
            }
        default:
            break;
    }
}