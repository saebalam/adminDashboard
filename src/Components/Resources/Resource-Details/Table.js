import React from 'react'
import TableFooter from './TableFooter'
import { useState,useEffect } from 'react';
import useTable from './UseTable';
import { Link } from 'react-router-dom';

const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <div>
        <table className='table table-hover' >
                        <thead style={{ borderBottom: '1px solid black',borderTop: '1px solid black',paddingBottom:'5px'}}>
                            <th style={{color:"white",padding:'4px 0 4px 0'}}>khkjhl</th>
                            <th >TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>LINK</th>
                        </thead>
                        <tbody>
                            {slice.map(item => {

                                return <tr>
                                    <td style={{padding:'13px 15px'}}><input type="checkbox" name="" id="" /></td>
                                    <td style={{padding:'13px 15px'}}>{item.title}</td>
                                    <td style={{padding:'13px 15px'}}>{item.description}</td>
                                    <td style={{padding:'13px 15px'}}><Link to='#' style={{textDecoration:'none'}}>{item.link}</Link></td>
                                </tr>
                            })

                            }
                        </tbody>
                    </table>
                    <div style={{display:'flex',justifyContent:"center",marginTop:"10px"}}>
                    <TableFooter range={range} slice={slice} setPage={setPage} page={page}  />
                    </div>
    </div>
  )
}

export default Table