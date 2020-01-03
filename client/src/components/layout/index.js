import React, {useState} from 'react';
import {Sidebar, Menu, Header, Icon, Button} from 'semantic-ui-react';
import {InfoBar} from '../';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const Layout = ({children}) => {
    const [visible, setVisible] = useState(false);

    return (
        <React.Fragment>
            <Menu 
                className={styles.menu}
                borderless 
                fixed='top'
            >
                <Menu.Item>
                    <Header 
                        as='h3' 
                        disabled
                    >
                        <Icon name='list alternate outline' />Test App Demo
                    </Header>
                </Menu.Item>
                <Menu.Menu 
                    position='right'
                >
                    <Menu.Item>
                        <Button 
                            as='a' 
                            basic 
                            circular 
                            icon={visible ? 'close' : 'info'} 
                            content='Info' 
                            onClick={() => setVisible(!visible)} 
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Sidebar.Pushable
                className={styles.pushable}
            >
                <InfoBar 
                    direction='top' 
                    animation='overlay' 
                    visible={visible} 
                />
                <Sidebar.Pusher 
                    dimmed={visible}
                >
                    {children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </React.Fragment>
    );
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;