import axios from 'axios'

const baseUrl = 'http://localhost:8000/';

export class Service {
    static register = (username, password, confirmPassword, email) => (
        axios.post(baseUrl + 'register', {username, password, confirmPassword, email})
    );

    static login = (username, password) => (
        axios.post(baseUrl + 'login', {username, password})
    );

    static createCar = (formData) => (
        axios.post(baseUrl + 'cars/create', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    );

    static editCar = (formData, id) => (
        axios.post(baseUrl + 'cars/edit/' + id, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
    );

    static deleteCar = (id) => (
        axios.get(baseUrl + 'cars/delete/' + id)
    );

    static getCars = (make, model, minPrice, maxPrice, page) => (
        axios.get(baseUrl + 'cars/list?make=' + make + '&model=' + model + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice + '&page=' + page)
    );

    static getSingleCar = (id) => (
        axios.get(baseUrl + 'cars/details/' + id)
    );

    static getPagesInfo = () => (
        axios.get(baseUrl + 'cars/pagesSize')
    );

    static postComment = (content, carId) => (
        axios.post(baseUrl + 'comments/create/' + carId, {content})
    );

    static getComments = (carId) => (
        axios.get(baseUrl + 'comments/list/' + carId)
    );

    static deleteComment = (commentId) => (
        axios.get(baseUrl + 'comments/delete/' + commentId)
    );
}