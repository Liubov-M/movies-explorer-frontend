import './FilterCheckbox.css'

export default function FilterCheckbox() {
  return (
    <div className='filterCheckbox'>
      <input name='checkbox' className='filterCheckbox__switch' type='checkbox' id='checkbox'></input>
      <label className='filterCheckbox__slider' htmlFor='checkbox'></label>
    </div>
  )
}
