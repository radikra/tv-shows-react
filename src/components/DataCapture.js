import React, { Component } from 'react'
import axios from 'axios'
import { ChannelsList } from './DataCapture/ChannelsList'
import { DatePicker } from './DataCapture/DatePicker'
import reserveLogo from '../assets/logo.png'

const CHANNELS_PATH = 'http://epg.domru.ru/channel/list?domain=perm'

export class DataCapture extends Component {
	state = {
		channels: [],
		actualChannel: null,
		isDate: false,
		queryString: ''
	}

	async componentDidMount() {
		await axios.get(`${CHANNELS_PATH}`)
			.then(response => this.setChannels(response.data))
			.catch(e => console.error(e))
	}

	setChannels = response => {
		const channels = response
			.filter(res => res.button != null)
			.sort((a,b) => a.button - b.button)
		this.setState({ channels })
	}

	getChannel = chid => {
		const actualChannel = this.state.channels.filter(ch => ch.chid === chid)[0]
		this.setState({ actualChannel })
	}

	clearChannel = () => {
		this.setState({ actualChannel: null })
	}

	render() {
		const channels = this.state.channels
		const isChannel = this.state.actualChannel

		return (
			<div className="widgets">
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
						<DatePicker 
							channelData={this.state.actualChannel} 
							onClick={(channel, date_from, date_to) => this.props.onClick(channel, date_from, date_to)} 
						/>
					</div>}
			</div>
		)
	}
}