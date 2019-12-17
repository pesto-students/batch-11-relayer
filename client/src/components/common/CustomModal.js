import React from 'react';
import {
  Modal, ModalBody, ModalFooter, ModalHeader, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

const CustomModal = ({
  _modal, _toggle, _error, _success, _modalTitle, _modalBody, _successColor, _onSuccess,
}) => {
  return (
    <div>
      <Modal isOpen={_modal} toggle={_toggle}>
        <ModalHeader toggle={_toggle}>{_modalTitle}</ModalHeader>
        <ModalBody>
          {_modalBody}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={_toggle}>{_error}</Button>
          {' '}
          {(_success !== '') ? <Button color={_successColor} onClick={_onSuccess}>{_success}</Button> : null}
        </ModalFooter>
      </Modal>
    </div>
  );
};

CustomModal.propTypes = {
  _modal: PropTypes.bool,
  _toggle: PropTypes.func,
  _error: PropTypes.string,
  _success: PropTypes.string,
  _successColor: PropTypes.string,
  _modalTitle: PropTypes.string,
  _onSuccess: PropTypes.func,
  _modalBody: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
}.isRequired;

export default CustomModal;
