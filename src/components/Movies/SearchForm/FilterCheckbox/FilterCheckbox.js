import './FilterCheckbox.css'

export default function FilterCheckbox({ changeShort, shortMovie }) {
  return (
    <div className='filterCheckbox'>
      <input name='checkbox' placeholder='checkbox' className='filterCheckbox__switch' type='checkbox' id='checkbox' onChange={() => changeShort()} checked={shortMovie}></input>
      <label className='filterCheckbox__slider' htmlFor='checkbox'></label>
    </div>
  )
}
