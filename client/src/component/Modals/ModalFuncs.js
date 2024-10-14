export const showHideModal = (item,openModal) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            currentObject: item,
            openModal: !openModal
        }
    })
}

export const showHideDeleteModal = (item,deleteModal) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            currentItem: item,
            deleteModal: !deleteModal
        }
    })
}

export const showHideImgModal = (item,viewImageModal) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            viewImage: item && item.attachment && item.attachment.id ? item.attachment.id : '',
            viewImageModal: !viewImageModal
        }
    })
}
