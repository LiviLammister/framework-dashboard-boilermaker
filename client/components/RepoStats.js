import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

const octokit = require('@octokit/rest')()

const FAKE_REPOS = [
  {
    name: 'angular',
    forks_count: 0,
    open_issues_count: 0,
    watchers_count: 0
  },
  {
    name: 'ember',
    forks_count: 0,
    open_issues_count: 0,
    watchers_count: 0
  },
  {
    name: 'react',
    forks_count: 0,
    open_issues_count: 0,
    watchers_count: 0
  },
  {
    name: 'vue',
    forks_count: 0,
    open_issues_count: 0,
    watchers_count: 0
  }
]

const BASE_URL = ''

export default class RepoStats extends Component {
  constructor() {
    super()
    this.state = {
      repos: []
    }
  }

  async componentDidMount() {
    const ANGULAR = await octokit.repos.get({owner: 'angular', repo: 'angular'})
    const EMBER = await octokit.repos.get({owner: 'emberjs', repo: 'ember.js'})
    const REACT = await octokit.repos.get({owner: 'facebook', repo: 'react'})
    const VUE = await octokit.repos.get({owner: 'vuejs', repo: 'vue'})

    this.setState({repos: [ANGULAR.data, EMBER.data, REACT.data, VUE.data]})
  }

  render() {
    return (
      // <div>
      //     <h1>RepoStats</h1>
      //     {
      //         this.state.repos.map(repo => {
      //             return (
      //                 <div key={repo.name}>
      //                     {repo.name}
      //                     {repo.forks_count}
      //                     {repo.open_issues_count}
      //                     {repo.watchers_count}
      //                 </div>
      //             )
      //         })
      //     }
      // </div>
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Forks</Table.HeaderCell>
              <Table.HeaderCell>Open Issues</Table.HeaderCell>
              <Table.HeaderCell>Watchers</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.repos.map(repo => (
              <Table.Row>
                <Table.Cell>{repo.name}</Table.Cell>
                <Table.Cell>{repo.forks_count}</Table.Cell>
                <Table.Cell>{repo.open_issues_count}</Table.Cell>
                <Table.Cell>{repo.watchers_count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
