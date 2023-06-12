import React from "react";

const ConfirmBox = ({ visible, onCancel, onConfirm, children }) => {
  const confirm = () => {
    onCancel();
    onConfirm();
  };

  return (
    <>
      {visible && (
        <div className="modal-container">
          <div className="card">
            <div style={{ margin: "25px 25px 75px 25px" }}>{children}</div>
            <div className="center-items">
              <div className="btn" onClick={() => onCancel()}>
                No
              </div>
              <div className="btn" onClick={confirm}>
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmBox;
