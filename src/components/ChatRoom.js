import React, { Component } from 'react'

class ChatRoom extends Component {

	constructor(props, context){
		super(props, context)
		this.updateMessage = this.updateMessage.bind(this)
		this.submitMessage = this.submitMessage.bind(this)
		this.state = {
			message: '',
			messages: []
		}
	}

	componentDidMount(){
		console.log('componentDidMount')
		firebase.database().ref('messages/').on('value', (snapshot) =>

			{const currentMessages = snapshot.val()
			
			if (currentMessages != null){
				this.setState({
					messages: currentMessages
				})	
			}
		})
	}

	updateMessage(event){
		console.log('updateMessage: '+event.target.value)
		this.setState({
			message: event.target.value
		})
	}

	submitMessage(event){
		console.log('submitMessage: '+this.state.message)
		const nextMessage = {
			id: this.state.messages.length,
			text: this.state.message
		}

		firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
		/*reconnect to firebase
		when we submit the next msg, find the msg key again
		add another key inside and set that next msg as value for the sub-index 0,1,2,3....
		firebase: even if the added key doesn't exist, it creates it for us, recursively. It actually creates two keys (msg key and index key) for us.
		*/

		//following code pushes every next msg to state, now firebase should handle that, and each msg should be pushed on to firebase.
		// var list = Object.assign([], this.state.messages)
		// list.push(nextMessage)
		// this.setState({
		// 	messages: list
		// })
	}

	render(){
		const currentMessage = this.state.messages.map((message, i) => {
			return (
				<li key={message.id}>{message.text}</li>
			)
		})

		return (
			<div>
				This is the ChatRoom Component <br/>
				<ol>
				{currentMessage}
				</ol>
				<input onChange={this.updateMessage} type="text" placeholder="Message"/>
				<br />
				<button onClick={this.submitMessage}>Submit Message</button>
				</div>

		)
	}
}

export default ChatRoom