
const FormInstance = ({itype, prop, value, placeholder, onChange}) => {
  return (
    <div className="form-control">
        <label htmlFor={prop}>{prop}</label>
        <input 
            type={itype}
            id={prop} 
            name={prop} 
            value={value} 
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
  )
}

export default FormInstance