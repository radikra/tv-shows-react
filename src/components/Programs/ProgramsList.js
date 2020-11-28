import React from 'react'
// хотел собрать все конки в один спрайт (<symbol></symbol>), 
// но не разобрался, как потом использовать '<svg><use></use></svg>' c JSX
import { ReactComponent as Done } from '../../assets/done.svg'
import { ReactComponent as Next } from '../../assets/next.svg'
import { ReactComponent as Playing } from '../../assets/playing.svg'

export default function ProgramsList(props) {
	return (
		<li className="programs__item details">
			{
				(props.icon === 'was') ? <Done className="details__icon"/> // прошедшие передачи
				: (props.icon === 'is') ? <Playing className="details__icon"/> // текущая передача
				: <Next className="details__icon"/> // будущие передачи
			}
			<p className="details__desc">
				<span>{props.start}: </span>
				<span>{props.title}</span>
			</p>
		</li>
	)
}