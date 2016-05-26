import React from 'react';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';

class App extends React.Component {
  state = {
    history: [],
    userID: Math.round(Math.random() * 1000000),
  }

  componentDidMount() {
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-199f8cfb-5dd3-470f-baa7-d6cb52929ca4',
      subscribe_key: 'sub-c-d2a5720a-1d1a-11e6-8b91-02ee2ddab7fe',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });
    this.PubNub.subscribe({
      channel: 'ReactChat',
      message: (message) => this.setState({ history: this.state.history.concat(message) }),
    });
  }

  render() {
    const { sendMessage, state } = this;
    return (
      <div>
        <ChatHistory history={ state.history } />
        <ChatInput userID={ state.userID } sendMessage={ sendMessage } />
      </div>
    );
  }

  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'ReactChat',
      message: message,
    });
  }
}

export default App;
