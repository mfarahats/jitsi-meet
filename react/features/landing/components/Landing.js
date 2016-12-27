import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { landingIsShown } from '../actions';

const links = {
    'android': 'https://play.google.com/store/apps/details?id=org.jitsi.meet',
    'ios': ''
};

/**
 * React component representing mobile landing page.
 *
 * @class Landing
 */
class Landing extends Component {

    /**
     * React lifecycle method triggered after
     * component is mount.
     *
     * @returns {void}
     */
    componentDidMount() {
        this.props.dispatch(landingIsShown());
    }

    static propTypes = {
        dispatch: React.PropTypes.func,
        platform: React.PropTypes.string,
        room: React.PropTypes.string
    };

    /**
     * React lifecycle method triggered before
     * component will mount.
     *
     * @returns {void}
     */
    componentWillMount() {
        const { room } = this.props;
        let btnText;
        let link = '/';

        if (room) {
            btnText = 'Join the conversation';
            link += room;
        } else {
            btnText = 'Start a conference';
        }

        this.setState({
            btnText,
            link
        });
    }

    /**
     * Renders landing component.
     *
     * @returns {ReactElement}
     */
    render() {
        const { platform } = this.props;
        const { btnText, link } = this.state;
        const primaryButtonClasses = 'landing__button landing__button_primary';

        return (
            <div className = 'landing'>
                <div className = 'landing__body'>
                    <img
                        className = 'landing__logo'
                        src = '/images/logo-blue.svg' />
                    <p className = 'landing__text'>
                       You need <strong>Meet Jitsi</strong> to
                       join a conversation on your mobile
                    </p>
                    <a href = { links[platform] }>
                        <button
                            className = { primaryButtonClasses }>
                            Download the App
                        </button>
                    </a>
                    <p className = 'landing__text landing__text_small'>
                       or if you already have it
                       <br /><strong>then</strong>
                    </p>
                    <Link to = { link }>
                        <button
                            className = 'landing__button'>{ btnText }</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        platform: state['features/app'].platform,
        room: state['features/base/conference'].room
    };
};

export default connect(mapStateToProps)(Landing);
