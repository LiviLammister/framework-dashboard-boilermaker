import _ from 'lodash'
import axios from 'axios'
import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

const NAME = 'name'
const COUNT = 'count'

export default class VotingResults extends Component {
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
    const payload = await axios.get('/api/frameworks')
    const {data} = payload
    this.setState({data})
  }

  render() {
    const {column, data, direction} = this.state
    return (
      <div>
        <h1>Results</h1>
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
                sorted={column === COUNT ? direction : null}
                onClick={this.handleSort(COUNT)}
              >
                Votes
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(data, ({name, count}) => (
              <Table.Row key={name}>
                <Table.Cell>{name}</Table.Cell>
                <Table.Cell>{count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
