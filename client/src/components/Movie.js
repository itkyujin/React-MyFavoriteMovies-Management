import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MovieDelete from './MovieDelete';

class Movie extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.title}</TableCell>
                <TableCell>{this.props.releaseYear}</TableCell>
                <TableCell>{this.props.runTime}</TableCell>
                <TableCell>{this.props.directorName}</TableCell>
                <TableCell><MovieDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default Movie;
