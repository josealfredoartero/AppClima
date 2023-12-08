export const Option = ({value , state = value}) => {
  return (
    <>
        <option value={value}>{state}</option>
    </>
  )
}
