import React from 'react';

export default class Choice extends React.Component {
    render() {
        return (
            <button
                onClick={() => {
                    this.props.onClick(this.props);
                }}
                className='choice'
            >
                {this.props.name + ' '}
                <div className='choice-icon'>{this.props.icon}</div>
            </button>
        );
    }
}
