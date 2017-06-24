import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = ({ label, onClick, disabled, visible }) => {
  const wrapperStyles = {
    ...styles.wrapper,
  };
  if (!visible) {
    wrapperStyles.opacity = 0;
    wrapperStyles.paddingTop = 0;
  }

  return (
    <div style={wrapperStyles}>
      <span onClick={onClick} disabled={disabled} style={styles.button}>
        {label}
      </span>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    transition: 'all 0.2s',
    opacity: 1,
    paddingTop: 20,
  },
  button: {
    fontSize: 16,
    color: '#bababa',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
};

LoadMore.defaultProps = {
  label: 'Carregar mais',
  visible: true,
  disabled: false,
};

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default LoadMore;
