import React, { Component } from 'react'
// компонент одной программы/передачи
import ProgramsList from './Programs/ProgramsList'
import axios from 'axios'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Ru from 'dayjs/locale/ru'

dayjs.extend(isBetween)
dayjs.extend(localizedFormat)
dayjs.locale(Ru)

// "префикс" для полноценной строки запроса
const PROGRAMS_PATH = 'http://epg.domru.ru/program/list?domain=perm'

export class Programs extends Component {
	state = {
		programs: []
	}

	// получение списка программ по выбранным параметрам (канал и дата)
	async componentDidMount() {
		const xvid = this.props.channel.xvid
		
		axios.get(`${PROGRAMS_PATH}&date_from=${this.props.date_from}&date_to=${this.props.date_to}&xvid=${xvid}`)
			.then(response => this.setPrograms(response.data[xvid]))
			.catch(e => console.error(e))
	}

	// сохрание списка программ в стейт
	setPrograms = response => {
		const programs = response
		this.setState({ programs })
	}

	render() {
		const programs = this.state.programs

		programs.forEach(program => {
			// ввел end для отображения актуальной иконки возле каждой программы
			program.end = dayjs(program.start).add(program.duration, 'seconds')
			// форматирование start под российскую локаль
			program.formattedStart = dayjs(program.start).format('LT')
			if (dayjs().isBetween(program.start, program.end, 'minute')) {
				program.icon = 'is' // признак для иконки 'playing'
			}
			if (dayjs().isBefore(program.start, 'minute')) {
				program.icon = 'will' // признак для иконки 'next'
			}
			if (dayjs().isAfter(program.end, 'minute')) {
				program.icon = 'was' // признак для иконки 'done'
			}
		})

		return (
			<div className="programs">
				{/* кнопка "назад" - возвращает к выбору канала */}
				<button className="go-back" onClick={() => this.props.onClick()}>
					<span>&#10094;</span>
				</button>

				{/* отображение выбранных канала и даты */}
				<div className="programs__header">
					<img 
						src={'http://epg.domru.ru' + this.props.channel.logo} alt="Логотип телеканала" className="programs__logo" />
					<h2 className="programs__title">{this.props.channel.title}</h2>
					<p className="programs__date">Программа на {dayjs(this.props.date_from).format('DD.MM.YYYY')}</p>
				</div>

				{/* описание канала */}
				<p className="programs__desc">{this.props.channel.description}</p>	

				{/* список программ */}
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