export function ChannelsList(props) {
	return (
		<button 
			className="panel__item channel"
			onClick={() => props.onClick(props.chid)}
		>
			<img 
				src={props.logo} 
				alt="Логотип канала" 
				className="channel__logo" 
			/>
			<p className="channel__title">{props.title}</p>
		</button>
	)
}