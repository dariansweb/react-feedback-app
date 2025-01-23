import PropTypes from 'prop-types';

const Button = ({
  children,
  version = 'primary',
  type = 'button',
  isDisabled = false,
}) => {
  return (
    <button className={`btn btn-${version}`} type={type} disabled={isDisabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default Button;
