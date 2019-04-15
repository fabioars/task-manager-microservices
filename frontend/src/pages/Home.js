import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Text } from 'grommet'
import styled from 'styled-components'
import axios from 'axios';

const Page = styled.div`
    font-family: sans-serif;
    background-color: #EDEDED;
    min-height: 100vh;
    width: 100%;
`;

const Header = styled.header`
    display: flex;
    background-color: #816CDB;
    min-height: 60px;
    margin-bottom: 30px;
`

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
`

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects() {
        axios.get('/api/projects').then(({ data }) => {
            this.setState({ projects: data })
        });
    }

    render() {
        return (
            <Page>
                <Header>
                    <Container>
                        Alguma coisa
                    </Container>
                </Header>
                <Container>
                    <Grid
                        columns={['1fr', '1fr', '1fr']}
                        gap="small"
                    >
                        {
                            this.state.projects.map(project => (
                                    <Link to={`project/${project._id}`} key={project._id}>
                                        <Box background="brand" round="xsmall" pad='large'>
                                            <Text color="white">{project.name}</Text>
                                        </Box>
                                    </Link>
                                )
                            )
                        }
                    </Grid>
                </Container>
            </Page>
        );
    }
}
 
export default Home;