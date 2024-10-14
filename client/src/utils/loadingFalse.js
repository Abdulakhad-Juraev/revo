const loadingFalse = (waitTime = 1000) => (dispatch) => {
    setTimeout(()=>{
        dispatch({
            type: 'updateState',
            payload: {
                loading: false
            }
        })
    },waitTime);
}

export default loadingFalse;