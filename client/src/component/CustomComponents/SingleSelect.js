import {AvField} from "availity-reactstrap-validation";
import React from "react";
import {nameRole, nameRoleOnly} from "../../utils/SecondaryFuncs/nameOfRole";

export const SingleSelect = (props) => {
    const {array,element,object} = props
    return (
        <div>
            <AvField type={"select"} name={element}>
                <option value={object && object.role && object.role.roleName ? object.role.roleName : 0}>
                    {object && object.role ? nameRole(object) : `Lavozim tanlang`}
                </option>
                {array ? array.map((item,i) =>
                    object && object.role && object.role.roleName && object.role.roleName === item ? '' : <option value={item} key={i}>{nameRoleOnly(item)}</option>
                ) : ''}
            </AvField>
        </div>
    );
}