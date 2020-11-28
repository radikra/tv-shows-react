import React, { Component } from 'react'
import axios from 'axios'
// компонент выбора канала
import { ChannelsList } from './DataCapture/ChannelsList'
// компонент выбора даты
import { DatePicker } from './DataCapture/DatePicker'
import reserveLogo from '../assets/logo.png'

// в этом проекте занес путь в переменную для удобства.
// в более глобальном проекте можно добавить компонент
// выбора города и опустить query-параметр domain
const CHANNELS_PATH = 'http://epg.domru.ru/channel/list?domain=perm'

export class DataCapture extends Component {
	state = {
		channels: [],
		actualChannel: null
	}

	// получение списка каналов
	async componentDidMount() {
		await axios.get(`${CHANNELS_PATH}`)
			.then(response => this.setChannels(response.data))
			.catch(e => console.error(e))
	}

	// сортировка и сохранение списка каналов в стейт
	setChannels = response => {
		const channels = response
			.filter(res => res.button != null) // удаляю каналы с "пустыми" кнопками
			.sort((a,b) => a.button - b.button) // сортировка по возрастанию, для удобства
		this.setState({ channels })
	}

	// получение и сохранение выбранного канала
	getChannel = chid => {
		const actualChannel = this.state.channels.filter(ch => ch.chid === chid)[0]
		this.setState({ actualChannel })
	}

	// возврат к выбору канала
	clearChannel = () => {
		this.setState({ actualChannel: null })
	}

	render() {
		const channels = this.state.channels
		const isChannel = this.state.actualChannel

		return (
			<div className="widgets">
				{/* если канал не выбран - показываю список каналов, иначе - выбор даты */}
				{!this.state.actualChannel 
				? <div className="channels">
						<div className="panel">
							<div className="panel__list">
								{channels.map(({ chid, title, logo }) => 
									<ChannelsList 
										key={chid}
										title={title}
										logo={logo ? ('http://epg.domru.ru' + logo) : reserveLogo}
										onClick={() => this.getChannel(chid)}
									/>
								)}
							</div>
						</div>
					</div>
				: <div className="dates">
						<div className="desc">
							<button 
								className="desc__back"
								onClick={() => this.clearChannel()}
							>
								&#10094;
							</button>
							<img src={'http://epg.domru.ru' + isChannel.logo} alt="Логотип телеканала" className="desc__logo" />
							<h1 className="desc__title">{isChannel.title}</h1>
						</div>
						{/* в компоненте ниже обработчик идет от App.js до DatePicker.js и обратно - 
								можно было бы обойти Redux'ом, но я с ним не знаком ;( */}
						<DatePicker 
							channelData={this.state.actualChannel} 
							onClick={(channel, date_from, date_to) => this.props.onClick(channel, date_from, date_to)} 
						/>
					</div>}
			</div>
		)
	}
}