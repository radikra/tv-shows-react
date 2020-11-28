import React, { Component } from 'react'
import ProgramsList from './Programs/ProgramsList'
import axios from 'axios'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Ru from 'dayjs/locale/ru'

dayjs.extend(isBetween)
dayjs.extend(localizedFormat)
dayjs.locale(Ru)

const PROGRAMS_PATH = 'http://epg.domru.ru/program/list?domain=perm'

export class Programs extends Component {
	state = {
		programs: []
	}

	async componentDidMount() {
		const xvid = this.props.channel.xvid
		axios.get(`${PROGRAMS_PATH}&date_from=${this.props.date_from}&date_to=${this.props.date_to}&xvid=${xvid}`)
			.then(response => this.setPrograms(response.data[xvid]))
			.catch(e => console.error(e))
	}

	setPrograms = response => {
		const programs = response
		this.setState({ programs })
	}

	render() {
		const programs = this.state.programs

		programs.forEach(program => {
			program.end = dayjs(program.start).add(program.duration, 'seconds')
			program.formattedStart = dayjs(program.start).format('LT')
			if (dayjs().isBetween(program.start, program.end, 'minute')) {
				program.icon = 'is'
			}
			if (dayjs().isBefore(program.start, 'minute')) {
				program.icon = 'will'
			}
			if (dayjs().isAfter(program.end, 'minute')) {
				program.icon = 'was'
			}
		})

		return (
			<div className="programs">
				<button className="go-back" onClick={() => this.props.onClick()}>
					<span>&#10094;</span>
				</button>
				<div className="programs__header">
					<img 
						src={'http://epg.domru.ru' + this.props.channel.logo} alt="Логотип телеканала" className="programs__logo" />
					<h2 className="programs__title">{this.props.channel.title}</h2>
					<p className="programs__date">Программа на {dayjs(this.props.date_from).format('DD.MM.YYYY')}</p>
				</div>
				<p className="programs__desc">{this.props.channel.description}</p>	
				<ul className="programs__list">
					{programs.map(({ start, formattedStart, title, icon }) => 
						<ProgramsList 
							key={start}
							start={formattedStart}
							title={title}
							icon={icon}
						/>
					)}
				</ul>
			</div>
		)
	}
}