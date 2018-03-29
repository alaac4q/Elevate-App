import React, { Component } from 'react';
import axios from 'axios';

class MoreBadges extends Component {
  constructor() {
    super();
    this.state = {
      hovered: '',
      achievements: []
    };
  }

  toggleHover = e => {
    this.setState({ hovered: e.target.id });
  };
  toggleLeave = e => {
    this.setState({ hovered: '' });
  };

  render() {
    const { hovered } = this.state;
    const { achievements, allAchievements } = this.props;
    const topThreeBadges = achievements.slice(-3);
    const userBadges = achievements.slice(0, achievements.length - 3);
    const remainingBadges = allAchievements.filter(
      achieve =>
        topThreeBadges.findIndex(
          userBadge => userBadge.badge_id === achieve.badge_id
        ) < 0
    );

    const hiddenBadges = remainingBadges.map(remainingBadge => {
      if (
        userBadges.findIndex(
          userBadge => remainingBadge.badge_id === userBadge.badge_id
        ) > -1
      ) {
        return (
          <div className="more-achievement-badge-container">
            {parseInt(hovered) === remainingBadge.badge_id ? (
              <div id={remainingBadge.badge_id} className="badge-hovered">
                {' '}
                <p> {remainingBadge.badge_name} </p>
              </div>
            ) : null}
            <img
              onMouseOver={this.toggleHover}
              onMouseLeave={this.toggleLeave}
              id={remainingBadge.badge_id}
              src={remainingBadge.badge_url}
              alt={remainingBadge.badge_url}
              className="more-user-achievement-badge"
            />
          </div>
        );
      } else {
        return (
          <div className="more-achievement-badge-container">
            {parseInt(hovered) === remainingBadge.badge_id ? (
              <div id={remainingBadge.badge_id} className="badge-hovered">
                {' '}
                <p> {remainingBadge.badge_name} </p>
              </div>
            ) : null}
            <img
              onMouseOver={this.toggleHover}
              onMouseLeave={this.toggleLeave}
              id={remainingBadge.badge_id}
              src={remainingBadge.badge_url}
              alt={remainingBadge.badge_url}
              className="more-user-achievement-badge badge-obtained"
            />
          </div>
        );
      }
    });

    return (
      <div
        className="more-user-badges-container"
        id="badges"
        data-aos="fade-down"
      >
        {hiddenBadges}
      </div>
    );
  }
}

export default MoreBadges;
