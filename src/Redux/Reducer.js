const initialState = {
    posts: [],
    users: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "AddPost":
            return { ...state, posts: payload }

        default:
            return state
    }
}
