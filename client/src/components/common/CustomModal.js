import React from 'react';
import {
  Modal, ModalBody, ModalFooter, ModalHeader, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

const CustomModal = ({
  _modal, _toggle, _error, _success, _modalTitle, _modalBody, _successColor,
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
          {(_success !== '') ? <Button color={_successColor} onClick={_toggle}>{_success}</Button> : null}
        </ModalFooter>
      </Modal>
    </div>
  );
};

CustomModal.propTypes = {
  _modal: PropTypes.bool.isRequired,
  _toggle: PropTypes.func.isRequired,
  _error: PropTypes.string.isRequired,
  _success: PropTypes.string.isRequired,
  _successColor: PropTypes.string.isRequired,
  _modalTitle: PropTypes.string.isRequired,
  _modalBody: PropTypes.element.isRequired,
};

export default CustomModal;
