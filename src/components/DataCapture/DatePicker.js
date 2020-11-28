import React, { Component } from 'react'
import dayjs from 'dayjs'

export class DatePicker extends Component {
	state = {
		dateRange: dayjs().format('YYYY-MM-DD'), // дата выбора
		dateStart: dayjs().format('YYYY-MM-DD'), // текущая дата
		dateEnd: dayjs().add(5, 'day').format('YYYY-MM-DD') // 5 дней - столько отдает API
	}

	// прокрутка списка дат "назад"
	prevDate = () => {
		let dateRange = this.state.dateRange

		// прибавляем к дню выбора 1 пока не достигнем дня окончания
		if (dayjs(dateRange).isAfter(this.state.dateStart, 'day')) {
			dateRange = dayjs(dateRange).subtract(1, 'day').format('YYYY-MM-DD')
			this.setState({ dateRange })
		} else {
			dateRange = this.state.dateEnd
			this.setState({ dateRange })
		}
	}

	// прокрутка списка дат "вперед"
	nextDate = () => {
		let dateRange = this.state.dateRange

		// убавляем день выбора на 1 пока не достигнем дня старта
		if (dayjs(dateRange).isBefore(this.state.dateEnd, 'day')) {
			dateRange = dayjs(dateRange).add(1, 'day').format('YYYY-MM-DD')
			this.setState({ dateRange })
		} else {
			dateRange = this.state.dateStart
			this.setState({ dateRange })
		}
	}

	render() {
		// эти три переменные - только для отображения дня месяца
		const dateRange = dayjs(this.state.dateRange).get('date')
		const dateStart = dayjs(this.state.dateStart).get('date')
		const dateEnd = dayjs(this.state.dateEnd).get('date')
		
		return (
			<div className="date">
				<div className="date__display">
					<button 
						type="button" 
						className="date__prev" 
						onClick={() => this.prevDate()}
					/>
					<div className="date__inside">
						<p className="date__numbers">
							{/* предыдущий от дня выбора день - его тоже уменьшаем до start/end */}
							<span className="date__prevnext">{
								(dateRange === dateStart) ? dateEnd : dayjs(this.state.dateRange).subtract(1, 'day').get('date')
							}</span>
							{/* день выбора */}
							<span className="date__actual">{ dateRange }</span>
							{/* следующий после дня выбора день - его тоже увеличиваем до start/end */}
							<span className="date__prevnext">{
								(dateRange === dateEnd) ? dateStart : dayjs(this.state.dateRange).add(1, 'day').get('date')
							}</span>
						</p>
					</div>
					<button 
						type="button" 
						className="date__next" 
						onClick={() => this.nextDate()}
					/>
					{/* кнопка выбора даты и передачи собранных данных о канале и датах */}
					{/* dayjs(this.state.dateRange).add(1, 'day').format('YYYY-MM-DD') = date_to в запросе к API */}
					<button 
						type="button" 
						className="date__done"
						onClick={() => this.props.onClick(this.props.channelData, this.state.dateRange, dayjs(this.state.dateRange).add(1, 'day').format('YYYY-MM-DD'))}
					/>
				</div>
			</div>
		)
	}
}