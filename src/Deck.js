import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deckID: '', image: [], suit: [] };
	}

	async componentDidMount() {
		const data = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
		this.setState({ deckID: data.deck_id });
	}

	async componentDidUpdate(prevState) {
		const data = await fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw`);
		const image = data.image;
		const suit = data.suit;
		this.setState({ image: [ ...prevState.image, image ], suit: [ ...prevState.suit, suit ] });
	}

	render() {
		return (
			//  <div className='Deck'>
			//   <h1 className='Deck-title'>♦ Card Dealer ♦</h1>
			//   <h2 className='Deck-title subtitle'>
			//     ♦ A little demo made with React ♦
			//   </h2>
			//   <button className='Deck-btn' onClick={this.getCard}>
			//     Get Card!
			//   </button>
			//   <div className='Deck-cardarea'>{cards}</div>
			// </div>
			<div className="Deck">
				<h1 className="Deck-title">♦ Card Dealer ♦</h1>
				<h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
				<button onClick={this.handleClick}>Give me a Card!</button>
				<div className="Deck-cardarea">
					<Card image={this.state.image} suit={this.state.suit} />
				</div>
			</div>
		);
	}
}

export default Deck;
