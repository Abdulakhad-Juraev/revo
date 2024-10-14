import React from 'react';
import {AvField} from "availity-reactstrap-validation";
import {makeFirstCapital} from "../../utils/PrimaryUtils";

export const CustomSelectUser = (props) => {
    const {object, element, array} = props
    return (
        <AvField type={'select'} name={`${element}Id`}>
            <option value={object && object[element] && object[element]['id'] ? object[element]['id'] : 0}>
                {object && object[element] && object[element]['firstName'] ? `${object[element]['firstName']} ${object[element]['lastName']} ${object[element]['phone']}` : `${makeFirstCapital(element)} tanlang`}
            </option>
            {
                array ? array.map((item, i) =>
                    object && object[element] && object[element]['id'] && object[element]['id'] === item.id ? '' :
                        <option value={item.id} key={i}>{`${item.firstName} ${item.lastName} ${item.phone}`}</option>
                ) : ''
            }
        </AvField>
    );
}


