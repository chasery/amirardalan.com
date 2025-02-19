export default function Dropdown({ label, value, handleChange, data }) {
  return (
    <label>
      {label+': '}
      <select value={value} onChange={(e) => handleChange(e)}>
        {data.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}