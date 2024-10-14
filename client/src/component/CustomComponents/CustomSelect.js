import React from 'react';
import {AvField} from "availity-reactstrap-validation";
import {getItemListByItemAction} from "../../redux/actionFuncs/mainActions";
import {makeFirstCapital} from "../../utils/PrimaryUtils";

export const CustomSelect = (props) => {
    const {object,element, array, func, dispatch,state,secondElement,parent,child} = props

    const fun = (e) => {
        console.log(e)
        if (func) {
            if (e.target.value === 0 || e.target.value === 0) {

            } else {
                dispatch(getItemListByItemAction(e.target.value, func.api, func.type,state,secondElement))
            }
        }
    }
    return (
        <AvField type={'select'} name={`${element}Id`} onChange={fun}>
                <option
                    value={parent ?
                        object && object[child] && object[child][element] && object[child][element]['id'] ? object[child][element]['id'] : 0
                        :
                        object && object[element] && object[element]['id'] ? object[element]['id'] : 0
                    }
                >
                    {
                        parent ?
                            object && object[child] && object[child][element] && object[child][element]['name'] ? object[child][element]['name'] : `${makeFirstCapital(element)} tanlang`
                            :
                            object && object[element] && object[element]['name'] ? object[element]['name'] : `${makeFirstCapital(element)} tanlang`
                    }
                </option>
                {
                    parent ?
                        array ? array.map((item, i) =>
                            object && object[child] && object[child][element] && object[child][element]['id'] && object[child][element]['id'] === item.id ? '' :
                                <option value={item.id} key={i}>{item.name}</option>
                        ) : ''
                        :
                        array ? array.map((item, i) =>
                            object && object[element] && object[element]['id'] && object[element]['id'] === item.id ? '' :
                                <option value={item.id} key={i}>{item.name}</option>
                        ) : ''
                }
            </AvField>
    );
}


