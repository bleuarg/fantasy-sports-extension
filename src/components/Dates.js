import React, { Component } from 'react';
import DateLine from './DateLine';
import './Dates.css';

class Dates extends Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  handleCloseClick() {
    if (this.props.closeModal) {
      // reload the window for the changes to current day to show up to the user.
      window.location.reload();
      this.props.closeModal();
    }
  }

  render() {
    let lines = [];
    if (this.props.dates && this.props.dates.length > 0) {
      this.props.dates.forEach((date, i) => lines.push(<DateLine key={i} date={date}/>));
    }
    return (
      <div className="FSE-Dates">
        <header className="Dates-header">
          Start active players
          <a className="F-link" onClick={this.handleCloseClick}>Close</a>
        </header>
        {lines}
        <footer className="Dates-footer">
          <a className="Btn Btn-short" onClick={this.handleCloseClick}>Done</a>
        </footer>
      </div>
    );
  }
}

export default Dates;