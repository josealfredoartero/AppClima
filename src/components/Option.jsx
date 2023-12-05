import React from 'react'

export const Option = ({value , state = value}) => {
  return (
    <>
        <option value={value}>{state}</option>
    </>
  )
}
