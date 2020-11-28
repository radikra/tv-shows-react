import React, { Component } from 'react'
// компонент сбора данных для отображения спика программ
import { DataCapture } from './components/DataCapture'
// компонент отображения списка программ - 
// на Vue это было реализовано двумя разными страницами
// и связано через Vue Router с передачей данных через
// query-параметры в адресной строке
import { Programs } from './components/Programs'
import './styles/main.scss'

class App extends Component {
	state = {
		channel: {},
		date_from: '',
		date_to: ''
	}

	// получение данных из компонента DataCapture,
	// для передачи их в компонент Programs для дальнейших манипуляций
	getQueryParams = (channel, date_from, date_to) => {
		const channelData = {
			xvid: channel.xvid,
			title: channel.title,
			description: channel.description,
			logo: channel.logo
		}
		this.setState({ channel:channelData, date_from, date_to })
	}

	// возврат на главную* страницу из компонента Programs
	// *главная страница - страница выбора каналов
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