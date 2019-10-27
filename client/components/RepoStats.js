import _ from 'lodash'
import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

const octokit = require('@octokit/rest')()

const NAME = 'name'
const FORKS_COUNT = 'forks_count'
const OPEN_ISSUES_COUNT = 'open_issues_count'
const WATCHERS_COUNT = 'watchers_count'

export default class RepoStats extends Component {
  constructor() {
    super()
    this.state = {
      column: null,
      data: [],
      direction: null
    }
  }

  handleSort = clickedColumn => () => {
    const {column, data, direction} = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      })
      return
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  async componentDidMount() {
    try {
      setInterval(async () => {
        const ANGULAR = await octokit.repos.get({
          owner: 'angular',
          repo: 'angular'
        })
        const EMBER = await octokit.repos.get({
          owner: 'emberjs',
          repo: 'ember.js'
        })
        const REACT = await octokit.repos.get({
          owner: 'facebook',
          repo: 'react'
        })
        const VUE = await octokit.repos.get({owner: 'vuejs', repo: 'vue'})

        this.setState({data: [ANGULAR.data, EMBER.data, REACT.data, VUE.data]})
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {column, data, direction} = this.state
    return (
      <div>
        <h1>Framework Stats</h1>
        <Table celled sortable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === NAME ? direction : null}
                onClick={this.handleSort(NAME)}
              >
                Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === FORKS_COUNT ? direction : null}
                onClick={this.handleSort(FORKS_COUNT)}
              >
                Forks
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === OPEN_ISSUES_COUNT ? direction : null}
                onClick={this.handleSort(OPEN_ISSUES_COUNT)}
              >
                Open Issues
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === WATCHERS_COUNT ? direction : null}
                onClick={this.handleSort(WATCHERS_COUNT)}
              >
                Watchers
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(
              data,
              ({name, forks_count, open_issues_count, watchers_count}) => (
                <Table.Row key={name}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{forks_count}</Table.Cell>
                  <Table.Cell>{open_issues_count}</Table.Cell>
                  <Table.Cell>{watchers_count}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
