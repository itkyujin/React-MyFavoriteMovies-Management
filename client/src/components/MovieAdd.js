import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});


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
            fileName: '',
            open: false
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

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            title: '',
            releaseYear: '',
            runTime: '',
            directorName: '',
            fileName: '',
            open: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add A Movie
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>ADD MOVIE</DialogTitle>
                    <DialogContent>
                    <TextField label="" type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Select Movie Poster Image" : this.state.fileName}
                            </Button>
                        <br/>
                        <TextField label="Movie Title" type="text" name="title" value={this.state.title} onChange={this.handleValueChange}/><br/>
                        <TextField label="Release Year" type="int" name="releaseYear" value={this.state.releaseYear} onChange={this.handleValueChange}/><br/>
                        <TextField label="Run Time" type="int" name="runTime" value={this.state.runTime} onChange={this.handleValueChange}/><br/>
                        <TextField label="Director Name" type="text" name="directorName" value={this.state.directorName} onChange={this.handleValueChange}/><br/>     
                    </DialogContent>
                </Dialog>
            </div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>Add Your Favorite Movie</h1>
            //     Movie Poster: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            //     Movie Title: <input type="text" name="title" value={this.state.title} onChange={this.handleValueChange}/><br/>
            //     Release Year: <input type="int" name="releaseYear" value={this.state.releaseYear} onChange={this.handleValueChange}/><br/>
            //     Run Time: <input type="int" name="runTime" value={this.state.runTime} onChange={this.handleValueChange}/><br/>
            //     Director Name: <input type="text" name="directorName" value={this.state.directorName} onChange={this.handleValueChange}/><br/>
            //     <button type="submit">Add A Movie</button>
            // </form>

        )
    }
}

export default MovieAdd;