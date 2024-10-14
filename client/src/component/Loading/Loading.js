import React, {Component} from 'react';
import "./Loading.scss";

class Loading extends Component {
    render() {
        const {active} = this.props
        return (
            <div className={"loading" + (active ? " loading-block" : '')}>
                <svg viewBox='0 0 1 200' className="preloader">
                    <polyline fill='#363A49' points='
		         -10 10  10 10 12.5 37.5 35.5 47 57  29 71 43 53 64.55 62.5 87.55 90 90 90 110 62.5 112.5 53 135.5 71 157 57 171 35.05 153 12.5 162.5 10 190 -10 190 -12.5 162.5 -35.05 153 -57 171 -71 157 -53 135.5 -62.5 112.5 -90 110 -90 90 -62.5 87.55 -53 64.55 -71 43 -57  29 -35.5 47 -12.5 37.5 -10 10'/>
                    <circle cx='0' cy='100' r='65' fill='#363A49' stroke='#363A49'/>
                    <circle cx='0' cy='100' r='50' fill='#fff' stroke='#fff'/>
                    <circle cx='0' cy='100' r='40' fill='#363A49' stroke='#363A49'/>
                    <circle cx='0' cy='100' r='15' fill='#fff' stroke='#fff'/>

                </svg>
            </div>
    );
    }
    }

    Loading.propTypes = {};

    export default Loading;