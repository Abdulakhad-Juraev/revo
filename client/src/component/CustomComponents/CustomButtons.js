import {
    CheckButtonSvg, CurrencyDollarSvg,
    DeleteButtonSvg,
    EditButtonSvg,
    EyeButtonSvg,
    EyeOffButtonSvg, MessageButtonSvg,
    MinusButtonSvg, PadlockSvg,
    PlusButtonSvg, RefreshButtonSvg,
    XSvg
} from "../Icons";
import "./CustomComponents.scss"

export const EditButton = (props) => {
    return(
        <div className={"editButton"} onClick={props.fun}>
            <EditButtonSvg/>
        </div>
    )
}


export const DeleteButton = (props) => {
    return(
        <div className={"deleteButton"} onClick={props.fun}>
            <DeleteButtonSvg/>
        </div>
    )
}

export const CloseButton = (props) => {
    return(
        <div className={"deleteButton"} onClick={props.fun}>
            <XSvg/>
        </div>
    )
}
export const ViewButton = (props) => {
    return(
        <div className={"viewButton"} onClick={props.fun}>
            <EyeButtonSvg/>
        </div>
    )
}
export const MessageButton = (props) => {
    return(
        <div className={"simpleButton"} onClick={props.fun}>
            <MessageButtonSvg/>
        </div>
    )
}



export const ViewOffButton = (props) => {
    return(
        <div className={"viewOffButton"} onClick={props.fun}>
            <EyeOffButtonSvg/>
        </div>
    )
}


export const CheckButton = (props) => {
    return(
        <div className={"checkButton" + (props.active ? " activeCheckButton" : '')} onClick={props.fun}>
            <CheckButtonSvg  />
        </div>
    )
}

export const PlusButton = (props) => {
    return(
        <div className={"viewButton"} onClick={props.fun}>
            <PlusButtonSvg  />
        </div>
    )
}
export const RefreshButton = (props) => {
    return(
        <div className={"refreshButton"} onClick={props.fun}>
            <RefreshButtonSvg  />
        </div>
    )
}

export const MinusButton = (props) => {
    return(
        <div className={"deleteButton"} onClick={props.fun}>
            <MinusButtonSvg  />
        </div>
    )
}

export const CurrencyDollarButton = (props) => {
    return(
        <div className={"currencyButton"} onClick={props.fun}>
            <CurrencyDollarSvg  />
        </div>
    )
}

export const PadlockButton = (props) => {
    return(
        <div className={"simpleButton"} onClick={props.fun}>
            <PadlockSvg  />
        </div>
    )
}
