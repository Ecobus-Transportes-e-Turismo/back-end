import styles from './loadding.module.css'

const Loadding = ():JSX.Element => {
    return (
        <div className = { styles.container }>
            <h2 className = { styles.title }>Loadding...</h2>
        </div>
    )
}
export default Loadding;