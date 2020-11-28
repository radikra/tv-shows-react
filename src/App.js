import React, { Component } from 'react'
import { DataCapture } from './components/DataCapture'
import { Programs } from './components/Programs'
import './styles/main.scss'

class App extends Component {
	state = {
		channel: {},
		date_from: '',
		date_to: ''
	}

	getQueryParams = (channel, date_from, date_to) => {
		this.setState({ channel, date_from, date_to })
	}

	clearQueryParams = () => {
		this.setState({ channel: {} })
	}

	render () {
		return (
			<div className="app">
				{ 
					!this.state.channel.xvid 
					? <DataCapture 
							onClick={(channel, date_from, date_to) => this.getQueryParams(channel, date_from, date_to)}
						/> 
					: <Programs 
							channel={this.state.channel}
							date_from={this.state.date_from}
							date_to={this.state.date_to}
							onClick={() => this.clearQueryParams()}
						/> 
				}
			</div>
		)
	}
}

export default App;