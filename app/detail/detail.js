import React, { Component } from 'react';

import detailStyles from './detail.sass';

export default class Detail extends Component {
  render() {
    return (
      <div className={detailStyles.main}>Detail page</div>
    );
  }
}