import React from 'react'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import PropTypes from 'prop-types'

// яку роль виконує цей компонент Table, може я не поняв, но він явно лишній
// в userTable ти пишеш
// <Table
//  onSort={onSort}
//  selectedSort={selectedSort}
//  columns={columns}
//  data={users}
// >
//      <TableHeader {...{ onSort, selectedSort, columns }} />
//      <TableBody {...{ columns, data: users }} />
// </Table>
// зачем пропси в Table якщо те ж саме ти прокидуєш на TableHeader і TableBody
//   плюс
// {children || (
//   <>
//       <TableHeader {...{ onSort, selectedSort, columns }} />
//       <TableBody {...{ columns, data }} />
//   </>
// )}
// children може не прийти?)


// розділення на  TableHeader і TableBody правильне
const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    )
}
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
}
export default Table
