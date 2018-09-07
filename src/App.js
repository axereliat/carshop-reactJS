import React, { Component } from 'react';
import Header from "./components/Header";
import Routes from "./Routes";
import Footer from "./components/Footer";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'

library.add(faBackward);
library.add(faTrash);
library.add(faEdit);
library.add(faSearch);
library.add(faSave);

class App extends Component {
  render() {
    return (
        <div>
            <Header />
            <Routes />
            <Footer />
        </div>
    );
  }
}

export default App;
