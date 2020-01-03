import React from 'react';
import {Card, Image} from 'semantic-ui-react';
import img from '../../images/user-astronaut-solid.svg';
import PropTypes from 'prop-types';

const UserCards = ({activeMonth, mobile, users}) => (
    <Card.Group 
        itemsPerRow={mobile ? 1 : 3}
    >
        {users.filter(user => user.monthName === activeMonth)
            .map(user => (
                <Card 
                    key={user.id}
                >
                    <Card.Content>
                        <Image
                            floated='right'
                            size='mini'
                            src={img}
                        />
                        <Card.Header>{user.fullName}</Card.Header>
                        <Card.Meta>{user.date}</Card.Meta>
                    </Card.Content>
                </Card>
            ))
        }
    </Card.Group>
);

UserCards.propTypes = {
    activeMonth: PropTypes.string,
    mobile: PropTypes.bool,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            monthName: PropTypes.string.isRequired
        })
    )
};

export default UserCards;