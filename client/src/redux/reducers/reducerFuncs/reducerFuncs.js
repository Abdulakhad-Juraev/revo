export const changeReducerState = (state,element,payload) => {
    state[element] = null
    if (payload && payload.payload && payload.payload.object) {
        state[element] = payload.payload.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    }
}

export const changeReducerStateDate = (state,element,payload) => {
    state[element] = null
    if (payload && payload.payload && payload.payload.object) {
        state[element] = payload.payload.object.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    }
}

export const changeReducerStateSimple = (state,element,payload) => {
    state[element] = null
    if (payload && payload.payload && payload.payload.object) {
        state[element] = payload.payload.object
    }
}

export const changeReducerOne = (state,element,payload) => {
    state[element] = null
    if (payload && payload.payload && payload.payload.object) {
        state[element] = payload.payload.object
    }
}

export const changeReducerStatePageable = (state,element,payload) => {
    state[element] = null
    if (payload && payload.payload && payload.payload.object && payload.payload.object.object && payload.payload.object.object.length !== 0) {
        state[element] = payload.payload.object.object.sort((a, b) =>
            b.id > a.id ? 1 : a.id > b.id ? -1 : 0
        );

        state.page = payload.payload.object.page
        state.size = payload.payload.object.size
        state.totalElements = payload.payload.object.totalElements
        state.totalPages = payload.payload.object.totalPages
    }
}

export const changeSelect = (state, element, payload, field) => {
    let arr = []
    if (payload && payload.payload && payload.payload.object) {
        payload.payload.object.forEach(item =>
            <>
                {arr.push({'value': item.id, 'label': `${item.name}`, leftover : item[field], lastPrice : item[field], "item" : item})}
            </>
        )
        state[element] = arr
    }
}
export const changeSelectSimple = (state, element, payload, fields) => {
    let arr = []
    if (payload && payload.payload && payload.payload.object) {
        payload.payload.object.forEach(item =>
            {arr.push({'value': item.id, 'label': getFields(item,fields), 'item' : item})}
        )
        state[element] = arr
    }
}

export const changeSelectSimplePageable = (state, element, payload, fields) => {
    let arr = []
    if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
        payload.payload.object.object.forEach(item =>
            {arr.push({'value': item.id, 'label': getFields(item,fields), 'item' : item})}
        )
        state[element] = arr
    }
}

export const changeSelectUser = (state, element, payload, fields) => {
    let arr = []
    if (payload && payload.payload && payload.payload.object) {
        payload.payload.object.forEach(item =>
            {arr.push({'id': item.id, 'name': getFields(item,fields)})}
        )
        state[element] = arr
    }
}


const getFields = (item,array) => {
    let string = ""
    array.forEach(element => (string = string + " " + item[element]))

    return string;
}
