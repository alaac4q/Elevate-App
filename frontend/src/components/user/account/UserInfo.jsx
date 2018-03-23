import React, { Component } from 'react';
import Modal from 'react-modal';
import EditUser from './EditUser.jsx';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      phoneNotification: '', 
      emailNotification: ''
    };
  }

  // Set notification settings by getting the data from backend 
  // On checkbox, set state 
  // On checkbox, update database with Y/N for notification settings 

  toggleModal = () => {
    let { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };

  handleInput = e => {
    console.log(e.target.name);
  }

  render() {
    console.log(this.state); 

    return (
      <div className="user-account-container" data-aos="fade-up">
        <div className="user-info-container">

          <div className="user-info-header">
            <h3>Account Information</h3>
            <i onClick={this.toggleModal} className="far fa-edit user-info-edit"></i>
          </div>
          <div>
            <p>Name: {this.props.activeUser.first_name} {this.props.activeUser.last_name}</p>
            <p>Email: {this.props.activeUser.username}</p>
            <p>Phone number: {this.props.activeUser.phone_number}</p>
          </div>

        </div>

        <div className="user-settings-container">
          <h3>Notification Settings</h3>
          <div>
            <p>Send me an important reminder ______ before the event.</p>
            <p>Notify me on my:</p>
            <label>
              <input type="checkbox" name="phone" onChange={this.handleInput} />
              Phone
            </label>
            <label>
              <input type="checkbox" name="email" onChange={this.handleInput} />
              Email
            </label>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          contentLabel="edit-user-modal"
          className="edit-user-modal"
        >
          <EditUser
            activeUser={this.props.activeUser}
            toggleModal={this.toggleModal}
          />
        </Modal>
      </div>
    );
  }
}

export default UserInfo;
