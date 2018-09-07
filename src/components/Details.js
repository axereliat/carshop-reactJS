import React, {Component} from 'react';
import {Navbar} from "reactstrap";
import {Service} from "../api/service";
import {Link} from "react-router-dom";
import {Auth} from "../api/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            car: null,
            content: '',
            loading: false,
            comments: [],
            commentsHtml: ''
        };

        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchComments = this.fetchComments.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount() {
        const carId = this.props.match.params.id;
        Service.getSingleCar(carId)
            .then(res => {
                this.setState({
                    car: res.data
                });
                this.fetchComments();
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchComments() {
        Service.getComments(this.state.car.id)
            .then(res => {
                this.setState({
                    comments: res.data
                });
                let comments = this.state.comments.map(comment => (
                    <li key={comment.id} className="list-group-item">
                        <strong>{comment.author.username}</strong> - {comment.content} <span style={{color: 'grey'}}>{comment.addedOn}</span>
                        {Auth.getUsername() === comment.author.username ? (
                            <button name={comment.id} className="btn btn-danger" onClick={this.deleteComment}><FontAwesomeIcon icon="trash" /></button>
                        ) : null}
                    </li>
                ));

                this.setState({
                    commentsHtml: comments
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteComment(e) {
        const commentId = e.target.name;

        Service.deleteComment(commentId)
            .then(() => {
                this.fetchComments();
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    postComment(e) {
        e.preventDefault();

        this.setState({loading: true});
        Service.postComment(this.state.content, this.state.car.id)
            .then(() => {
                this.setState({loading: false});
                this.setState({
                    content: ''
                });

                this.fetchComments();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                {this.state.car ? (
                    <div className="row mt-5 jumbotron">
                        <div className="col-md-6">
                            <img src={this.state.car.imageUrl} className="img-fluid" alt="car image"/>
                        </div>
                        <div className="col-md-6">
                            {Auth.getUsername() === this.state.car.seller.username ? (
                                <div>
                                    <Link to={"/cars/edit/" + this.state.car.id} className="btn btn-secondary"><FontAwesomeIcon icon="edit" /> Edit</Link>
                                    <Link to={"/cars/delete/" + this.state.car.id} className="btn btn-danger"><FontAwesomeIcon icon="trash" /> Delete</Link>
                                </div>
                            ) : null}
                            <h4><strong>Make: </strong>{this.state.car.make}</h4>
                            <h4><strong>Model: </strong>{this.state.car.model}</h4>
                            <h4><strong>Year of Production: </strong>{this.state.car.yearOfProduction}</h4>
                            <h4><strong>Country: </strong>{this.state.car.country}</h4>
                            <h4><strong>Price: </strong>${this.state.car.price}</h4>
                            <h4><strong>Offered By: </strong>{this.state.car.seller.username}</h4>
                        </div>

                        <form className="mt-5" onSubmit={this.postComment}>
                            <div className="form-group">
                                <textarea className="form-control" id="content" name="content" rows="5" cols="50"
                                          placeholder="What are your thoughts?" onChange={this.handleChange} disabled={this.state.loading} value={this.state.content}/>
                                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>{this.state.loading ? 'please wait...' : 'Post'}</button>
                            </div>
                            <ul className="list-group">
                                {this.state.commentsHtml}
                            </ul>
                        </form>
                    </div>
                ) : null}
                <Link to='/' className='btn btn-secondary'><FontAwesomeIcon icon="backward" /> Back</Link>
            </div>
        );
    }
}

export default Details;
