
import PropTypes from "prop-types";

function Card({ children, reverse=false }) {
  return (
    <div className={`card ${reverse && 'reverse'}`} style={{textAlign: 'center' }}>   
        {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired
}

export default Card




