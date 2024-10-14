import React from "react";
import {CustomSelect} from "./CustomSelect";
import {CustomCheckbox, CustomInput, CustomRadio} from "./CustomInput";
import CustomFileInput from "./CustomFileInput";
import {SingleSelect} from "./SingleSelect";
import {CustomSelectUser} from "./CustomSelectUser";

export const CustomForm = (props) => {
    const {state,dispatch,object} = props

    const chooseType = (item, object) => {
        switch (item.type) {
            case "select" : return <CustomSelect parent={item.parent} child={item.child} array={item.array} element={item.element} func={item.func} dispatch={dispatch}
                                         state={state} secondElement={item.secondElement} object={object}/>

            case "select_user" : return <CustomSelectUser object={object} array={item.array} element={item.element}/>

            case "file" : return <CustomFileInput object={object} multi={item.multi}/>;

            case "single_select_role" : return <SingleSelect array={item.array} element={item.element} object={object}/>

            case "checkbox" : return  <CustomCheckbox element={item.element} placeHolder={item.placeHolder} object={object} />

            case "radio" : return <CustomRadio element={item.element} array={item.array} object={object}/>

            default : return <CustomInput type={item.type} element={item.element} required={item.required} placeHolder={item.placeHolder} object={object}/>
        }
    }

    return (
        state ? state.customForm.map((item) =>
            chooseType(item,object)
        ) : ''
    );
}