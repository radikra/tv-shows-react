import React, { Component } from 'react'
import dayjs from 'dayjs'

export class DatePicker extends Component {
	state = {
		dateRange: dayjs().format('YYYY-MM-DD'),
		dateStart: dayjs().format('YYYY-MM-DD'),
		dateEnd: dayjs().add(5, 'day').format('YYYY-MM-DD')
	}

	prevDate = () => {
		let dateRange = this.state.dateRange

		if (dayjs(dateRange).isAfter(this.state.dateStart, 'day')) {
			dateRange = dayjs(dateRange).subtract(1, 'day').format('YYYY-MM-DD')
			this.setState({ dateRange })
		} else {
			dateRange = this.state.dateEnd
			this.setState({ dateRange })
		}
	}

	nextDate = () => {
		let dateRange = this.state.dateRange

		if (dayjs(dateRange).isBefore(this.state.dateEnd, 'day')) {
			dateRange = dayjs(dateRange).add(1, 'day').format('YYYY-MM-DD')
			this.setState({ dateRange })
		} else {
			dateRange = this.state.dateStart
			this.setState({ dateRange })
		}
	}

	render() {
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
							<span className="date__prevnext">{
								(dateRange === dateStart) ? dateEnd : dayjs(this.state.dateRange).subtract(1, 'day').get('date')
							}</span>
							<span className="date__actual">{ dateRange }</span>
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