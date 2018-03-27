import React, { Component } from 'react';
import Modal from 'react-modal';
import getWeekDates from '../common/getWeekDates';
import Dates from './Dates';
import './StartActive.css';

class StartActiveButton extends Component {
  constructor(props) {
    super(props);
    this.startDate = props.startDate;

    this.state = {
      dates: [],
      modalIsOpen: false
    };

    this.startActiveClick = this.startActiveClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  startActiveClick() {
      this.setState({
        dates: getWeekDates(this.startDate),
        modalIsOpen: true
      });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    let className = `Btn Btn-short Btn-primary Mend-med FSE-StartActive ${this.props.disabled ? 'Btn-disabled' : ''}`;

      return (
      <div>
        <button
          title={this.props.title}
          className={className}
          disabled={this.props.disabled}
          onClick={this.startActiveClick}>
          {this.props.label}
        </button>

        <Modal
          className={{
            base: 'FSE-Modal-content',
            afterOpen: '',
            beforeClose: ''
          }}
          overlayClassName={{
            base: 'FSE-Modal-overlay',
            afterOpen: '',
            beforeClose: ''
          }}
          ariaHideApp={false}
          style={this.modalStyles}
          isOpen={this.state.modalIsOpen}>
          <Dates
            closeModal={this.closeModal}
            dates={this.state.dates}></Dates>
        </Modal>
      </div>
    );
  }
}

export default StartActiveButton;