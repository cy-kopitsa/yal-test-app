import React, {useEffect, useState} from 'react';
import {Responsive, Segment, Grid, Container} from 'semantic-ui-react';
import {Layout, MonthMenu, UserCards, ErrorMessage} from './components';
import {useFetch, useStore} from './hooks';

const App = () => {
    const [mobile, setMobile] = useState(false);
    const {loading, data, error, sendRequest} = useFetch();
    const [state, dispatch] = useStore();
    const monthClickHandler = (monthName) => dispatch({type: 'SET_MONTH', monthName});

    useEffect(() => sendRequest(), [sendRequest]);
    useEffect(() => dispatch({type: 'UPDATE', data}), [dispatch, data]);

    return (
        <Layout>
            <Responsive
                as={Segment}
                basic 
                fireOnMount
                loading={loading}
                onUpdate={(e, {width}) => setMobile(width <= Responsive.onlyMobile.maxWidth)}
            >
                {error
                    ? <ErrorMessage onSendRequestClick={sendRequest} />
                    : <Grid 
                        stackable 
                        centered
                    >
                        <Grid.Row>
                            <Grid.Column>
                                <Container 
                                    textAlign='center'
                                >
                                    <MonthMenu
                                        mobile={mobile}
                                        months={state.months}
                                        activeMonth={state.activeMonth}
                                        onMonthClick={monthClickHandler}
                                    />
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column 
                                width={8}
                            >
                                <UserCards 
                                    mobile={mobile}
                                    users={state.users}
                                    activeMonth={state.activeMonth}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }
            </Responsive>
        </Layout>
    );
}

export default App;
