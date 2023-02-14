const initialData = {
    style: 'Grid',
}
const styleReducer = (state = initialData, action) => {
    switch (action.type) {
        case "STYLE":
            const { style } = action.payload; 
            return {
                style: style
            }

        default:
            return state;
    }
}

export default styleReducer
