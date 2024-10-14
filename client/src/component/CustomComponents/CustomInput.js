import React from 'react';
import {makeFirstCapital} from "../../utils/PrimaryUtils";
import {AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {Col} from "reactstrap";

export const CustomInput = (props) => {
    const {type,element,object,placeHolder, required} = props
    return (
        <div>
            <AvField type={type} name={element} placeholder={placeHolder ? makeFirstCapital(placeHolder) : makeFirstCapital(element) }
                     defaultValue={object && object[element] ? object[element] : ''} required={required}/>
        </div>
    );
}

export const CustomCheckbox = (props) => {
    const {element,object,placeHolder} = props
    return (
        <div>
            <AvField type={'checkbox'} name={element} label={placeHolder ? makeFirstCapital(placeHolder) : makeFirstCapital(element) }
                     defaultChecked={object && object[element] ? object[element] : false}/>
        </div>
    );
}

export const CustomRadio = (props) => {
    const {element,object, array} = props
    return (
        <Col md={6}>
            <AvRadioGroup name={element} errorMessage="Tanlash majburiy!">
                {array ? array.map(item =>
                    <AvRadio label={item.label} value={item.value} defaultChecked={object && object.in ? object.in : false} />
                ) : ''}
            </AvRadioGroup>
        </Col>
    );
}

