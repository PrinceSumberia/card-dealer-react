import React from 'react';
import './Card.css';

class Card extends React.Component {
	constructor(props) {
		super(props);
		let angle = Math.random() * 90 - 45;
		let xPos = Math.random() * 40 - 20;
		let yPos = Math.random() * 40 - 20;
		this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
	}
	render() {
		return (
			<img style={{ transform: this._transform }} className="Card" alt={this.props.suit} src={this.props.image} />
		);
	}
}

export default Card;
