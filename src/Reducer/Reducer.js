const initialData = {
    user: [],
}
const userReducer = (state = initialData, action) => {
    switch (action.type) {
        case "ADD_USER":
            const { data, id } = action.payload;
            // return {
            //     ...state,
            //     user: [
            //         ...state.user,
            //         {
            //             id: id,
            //             data: data

            //         }]
            // }
            return {
                // ...state,
                user: [
                    // ...state.user,
                    {
                        id: id,
                        data: data,
                    }],
            }
        case "REMOVE_USER":
            return {
                user: [
                ]
            }
        // case "STYLE":
        //     const { id, style } = action.payload;
        //     // console.log(state.user[0].data);
        //     return {
        //         user: [
        //             // ...state,
        //             ...state.user,
        //             {
        //                 id: id,
        //                 style: style
        //             }
        //         ]
        //     }

        default:
            return state;
    }
}

export default userReducer

const wishlistReducer = (state = initialData, action) => {
    switch (action.type) {
        case "WISHLIST":

            const { item_id, items } = action.payload;


            return {
                items: [
                    // ...state.items,
                    {

                        id: item_id,
                        data: items

                    }]
            }

        default:
            return state;
    }
}
// export default wishlistReducer

// export default { userReducer, wishlistReducer }