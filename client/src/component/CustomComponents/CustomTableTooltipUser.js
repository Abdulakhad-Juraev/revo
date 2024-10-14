import React, {Component} from 'react';

class CustomTableTooltipUser extends Component {
    render() {

        const {user} = this.props
        return (
            user !== null ?
                <div className={"table-tooltip"}>
                    {user.phone ?? ''}
                    <span>{`${user.firstName === null ? "" : user.firstName}`}</span>
                </div>
                : ""
        );
    }
}

CustomTableTooltipUser.propTypes = {};

export default CustomTableTooltipUser;