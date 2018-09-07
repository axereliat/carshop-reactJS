import React, {Component} from 'react';
import {Service} from "../api/service";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: null,
            model: '',
            make: '',
            minPrice: '',
            maxPrice: '',
            pages: 1,
            pagesHtml: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        Service.getCars('', '', '', '', '1')
            .then(res => {
                this.setState({
                    cars: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
        Service.getPagesInfo()
            .then(res => {
                this.setState({
                    pages: res.data.pages
                });
                let pages = [];
                for(let i = 1; i <= this.state.pages; i++) {
                    pages.push(<li className="page-item"><a className="page-link" onClick={this.changePage} name={i}>{i}</a></li>)
                }
                this.setState({
                    pagesHtml: pages
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    changePage(e) {
        e.preventDefault();
        const page = e.target.name;
        Service.getCars(this.state.make, this.state.model, this.state.minPrice, this.state.maxPrice, page)
            .then(res => {
                this.setState({
                    cars: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSearch(e) {
        e.preventDefault();
        Service.getCars(this.state.make, this.state.model, this.state.minPrice, this.state.maxPrice, '1')
            .then(res => {
                this.setState({
                    cars: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="jumbotron bg-carShop-jumbotron">
                <h1 className="text-center">Welcome to CarShop</h1>
                <h3>Search:</h3>
                <div className="border w-50">
                    <form onSubmit={this.handleSearch}>
                        <div className="form-group">
                            <label htmlFor="make" className="control-label">Make</label>
                            <input type="text"
                                   className="form-control"
                                   id="make"
                                   name="make"
                                   placeholder="Search by make..."
                                   onChange={this.handleChange}
                                   disabled={this.state.loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="model" className="control-label">Model</label>
                            <input type="text"
                                   className="form-control"
                                   id="model"
                                   name="model"
                                   placeholder="Search by model..."
                                   onChange={this.handleChange}
                                   disabled={this.state.loading}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="minPrice" className="control-label">Min price</label>
                                    <input type="text"
                                           className="form-control"
                                           id="minPrice"
                                           name="minPrice"
                                           placeholder="Set min price..."
                                           onChange={this.handleChange}
                                           disabled={this.state.loading}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="maxPrice" className="control-label">Max price</label>
                                    <input type="text"
                                           className="form-control"
                                           id="maxPrice"
                                           name="maxPrice"
                                           placeholder="Set max price..."
                                           onChange={this.handleChange}
                                           disabled={this.state.loading}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon="search" /> Search</button>
                    </form>
                </div>
                <div className="row mt-3">
                    {this.state.cars ? (
                        this.state.cars.map(car => (
                            <div key={car.id} className="col-md-4">
                                <img src={car.imageUrl} alt="car image" className="img-thumbnail"/>
                                <h3 className="text-center"><Link to={'/cars/details/' + car.id}>{car.yearOfProduction} {car.make} {car.model}, price: ${car.price}</Link></h3>
                            </div>
                        ))
                    ) : 'No results...'}
                </div>
                <nav aria-label="Page navigation example mt-3">
                    <ul className="pagination">
                        {this.state.pages > 1 ?
                            this.state.pagesHtml
                            : null}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Home;
