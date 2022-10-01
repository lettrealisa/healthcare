const style = {
    border: '2px solid var(--primary)'
}

const AlcoholItem = ({cardHeader, cardBody}) => {
    return (<div className="gridItem"><div>{cardHeader}</div><div>{cardBody}</div></div>)
}

export default AlcoholItem