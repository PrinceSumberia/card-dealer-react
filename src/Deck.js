import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';

class Deck extends Component {
	constructor(props) {
		super(props);
		this.state = { deckID: '', drawn: [] };
		this.getCard = this.getCard.bind(this);
	}

	async componentDidMount() {
		let response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
		this.setState({ deckID: response.data.deck_id });

		//------------------ Using Fetch API ------------------------
		// let response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
		// let data = await response.json();
		// console.log(data);
	}

	async getCard() {
		try {
			const response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/`);
			if (!response.data.success) {
				throw new Error('No card remaining!');
			}
			const cards = response.data.cards;
			this.setState((st) => ({
				drawn: [
					...st.drawn,
					{
						id: cards[0].code,
						image: cards[0].image,
						suit: cards[0].suit
					}
				]
			}));
		} catch (err) {
			alert(err);
		}
	}

	render() {
		const cards = this.state.drawn.map((card) => <Card key={card.id} image={card.image} suit={card.suit} />);
		return (
			<div className="Deck">
				<h1 className="Deck-title">♦ Card Dealer ♦</h1>
				<h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
				<button onClick={this.getCard}>Give me a Card!</button>
				<div className="Deck-cardarea">{cards}</div>
			</div>
		);
	}
}

export default Deck;
