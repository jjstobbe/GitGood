import React, { Component } from 'react';
import { remote } from 'electron';
import styles from './RepoBar.css';
import RepoTab from './RepoTab'

export default class RepoBar extends Component<Props> {

  importRepoDialog = () => {
    let selectedPath = remote.dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (selectedPath && selectedPath.length > 0) {
      this.props.importRepo(selectedPath[0]);
    }
  }

  render() {
    const { repos } = this.props;

    return (
      <div className={styles.repoBarContainer} >
        { repos && repos.map((repo, index) => <RepoTab key={index} repo={repo} {...this.props} />) }

        <div className={styles.importRepoContainer} onClick={this.importRepoDialog}>
          +
        </div>
      </div>
    );
  }
}
