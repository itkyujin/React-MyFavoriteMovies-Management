import React from 'react';
import { post } from 'axios';

class MovieAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            title: '',
            releaseYear: '',
            runTime: '',
            directorName: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addMovie()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            title: '',
            releaseYear: '',
            runTime: '',
            directorName: '',
            fileName: ''
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addMovie = () => {
        const url = '/api/movies';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('title', this.state.title);
        formData.append('releaseYear', this.state.releaseYear);
        formData.append('runTime', this.state.runTime);
        formData.append('directorName', this.state.directorName);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>Add Your Favorite Movie</h1>
                Movie Poster: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                Movie Title: <input type="text" name="title" value={this.state.title} onChange={this.handleValueChange}/><br/>
                Release Year: <input type="int" name="releaseYear" value={this.state.releaseYear} onChange={this.handleValueChange}/><br/>
                Run Time: <input type="int" name="runTime" value={this.state.runTime} onChange={this.handleValueChange}/><br/>
                Director Name: <input type="text" name="directorName" value={this.state.directorName} onChange={this.handleValueChange}/><br/>
                <button type="submit">Add A Movie</button>
            </form>
        )
    }
}

export default MovieAdd;