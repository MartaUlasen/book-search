import React, { Component } from 'react';

class Sorter extends Component {
	state = {
        sortCount: 24,
	}
	
	changeSortCount = (sortCount) => {
		this.setState({ sortCount })
	}

    render() {
        return (
            <select>
				<option>24</option>
				<option>48</option>
				<option>72</option>
			</select>
		)
	}
}

export default Sorter;