import React, { Component } from 'react';
import styles from './BranchBar.css';

export default class BranchBar extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      remotesQuery: '',
      branchesQuery: '',
      searchingRemotes: false,
      searchingBranches: false
    }
  }

  componentDidMount() {
    this.props.getAllBranches && this.props.getAllBranches()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.searchingRemotes && this.state.searchingRemotes) {
      console.log(this.state.branchesInputRef);
      // this.state.remotesInputRef.focus();
    }
  }

  sortBranches = (a, b) => {
    return (a.display).localeCompare(b.display)
  }

  searchRemotes = (e) => {
    this.setState({
      remotesQuery: e.target.value,
    })
  }
  searchBranches = (e) => {
    this.setState({
      branchesQuery: e.target.value,
    })
  }

  clickBranches = () => { this.setState({ searchingBranches: true }) }
  clickRemotes = () => { this.setState({ searchingRemotes: true }) }
  blurBranches = () => { this.setState({ searchingBranches: false }) }
  blurRemotes = () => { this.setState({ searchingRemotes: true }) }

  render() {
    const {
      branchDict,
      remoteDict,
      changeToLocalBranch,
      changeToRemoteBranch,
    } = this.props;

    const {
      remotesQuery,
      branchesQuery,
      searchingRemotes,
      searchingBranches,
    } = this.state;

    let branches = [];
    Object.keys(branchDict || {}).forEach(function(key) {
      branches.push(branchDict[key]);
    });

    let remotes = [];
    Object.keys(remoteDict || {}).forEach(function(key) {
      remotes.push(remoteDict[key]);
    });

    branches.sort(this.sortBranches)
    remotes.sort(this.sortBranches)

    if (searchingBranches && branchesQuery) {
      branches = branches.filter(branch => branch.display.toLowerCase().indexOf(branchesQuery.toLowerCase()) != -1 )
    }
    if (searchingRemotes && remotesQuery) {
      remotes = remotes.filter(remote => remote.display.toLowerCase().indexOf(remotesQuery.toLowerCase()) != -1 )
    }

    return (
      <div className={styles.branchBarContainer}>
        <div>
          {
            searchingBranches ?
            <div>
              <input autoFocus type="text"
                ref={this.setBranchesInputRef}
                value={branchesQuery}
                onChange={this.searchBranches}
                onBlur={this.blurBranches} />
              </div> :
            <h3 onClick={this.clickBranches}> Branches </h3>
          }
          <ul className={styles.branchesContainer}>
            { branches.map(branch => <li onDoubleClick={changeToLocalBranch}> { branch.display }</li>)}
          </ul>
        </div>

        <div className={styles.remotesContainer}>
          {
            searchingRemotes ?
            <div>
              <input autoFocus type="text"
                ref={this.setRemotesInputRef}
                value={remotesQuery}
                onChange={this.searchRemotes}
                onBlur={this.blurRemotes} />
            </div> :
            <h3 onClick={this.clickRemotes}> Remotes </h3>
          }
          <ul className={styles.branchesContainer}>
            { remotes.map(remote => <li onDoubleClick={changeToRemoteBranch}> { remote.display }</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
