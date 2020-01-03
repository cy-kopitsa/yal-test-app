import React from 'react';
import {Button, Header, Icon, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ErrorMessage = ({onSendRequestClick}) => (
    <Segment 
        basic 
        placeholder
    >
        <Header 
            icon
        >
            <Icon name='frown outline' />
            Something went wrong while fetching data.
        </Header>
        <Button
            negative
            onClick={onSendRequestClick}
        >
            Try again
        </Button>
    </Segment>
);

ErrorMessage.propTypes = {
    onSendRequestClick: PropTypes.func
};

export default ErrorMessage;