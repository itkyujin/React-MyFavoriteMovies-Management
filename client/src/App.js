import React, { Component } from 'react';
import Movie from './components/Movie';
import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

class App extends Component {
  state = {
    movies: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({movies: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/movies');
    const body = await response.json();
    return body;
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Movie Poster</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Release Year</TableCell>
              <TableCell>Run Time</TableCell>
              <TableCell>Director Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        {
          this.state.movies ? this.state.movies.map(c => {
            return (
              <Movie
                key={c.id}
                id={c.id}
                image={c.image}
                title={c.title}
                releaseYear={c.releaseYear}
                runTime={c.runTime}
                directorName={c.directorName}
              />  
            );
          }) : ""}
          </TableBody>
        </Table>
      </Paper>           
    );  
  }
}

export default App;