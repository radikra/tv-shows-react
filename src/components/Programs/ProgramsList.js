import React from 'react'
import { ReactComponent as Done } from '../../assets/done.svg'
import { ReactComponent as Next } from '../../assets/next.svg'
import { ReactComponent as Playing } from '../../assets/playing.svg'

export default function ProgramsList(props) {
	return (
		<li className="programs__item details">
			{
				(props.icon === 'was') ? <Done className="details__icon"/>
				: (props.icon === 'is') ? <Playing className="details__icon"/>
				: <Next className="details__icon"/>
			}
			<p className="details__desc">
				<span>{props.start}: </span>
				<span>{props.title}</span>
			</p>
		</li>
	)
}