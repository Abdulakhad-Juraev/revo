export const checkStates = (v, state, object) => {
    state.customForm.forEach(item =>
        object && object.id ?
            item.type === "select" || item.type === "select_user" ?
                v[`${item.element}Id`] === "" || v[`${item.element}Id`] === null ?
                    v[`${item.element}Id`] = object[`${item.element}`]['id'] : ''
                :
                item.type === "single_select_role" ?
                    v[`${item.element}`] === "" || v[`${item.element}`] === null ?
                        v[`${item.element}`] = object['role'][`${item.element}`] : ''
                    :
                    v[`${item.element}`] = v[`${item.element}`]
            :
            ""
    )
}