import styles from './input.module.css'


type Input = {
    type:string,
    autoComplete?:string,
    value:string,
    setValue?:any,
    placeholder?:string
}

const Input  = ({type, autoComplete, value, setValue, placeholder}:Input):JSX.Element => {
    return (
        <div className={styles.container}>
            <input 
                type = { type }
                autoComplete={!autoComplete?'true':autoComplete}
                value = {value}
                onChange = {(event)=>{
                    setValue(event.target.value)
                }}
                placeholder={!placeholder ? '': placeholder}
                className = { styles.input }
            />
        </div>
    )
}

export default Input;