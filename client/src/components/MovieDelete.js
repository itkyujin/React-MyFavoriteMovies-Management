import React from 'react';

class MovieDelete extends React.Component {

    deleteMovie(id) {
        const url = '/api/movies/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }


    render() {
        return (
            <button onClick={(e) => {this.deleteMovie(this.props.id)}}>DELETE</button>
        )
    }
}

export default MovieDelete;