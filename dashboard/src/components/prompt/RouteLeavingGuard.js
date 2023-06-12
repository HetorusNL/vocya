import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";

export const RouteLeavingGuard = ({
  navigate,
  when,
  shouldBlockNavigation,
  content,
}) => {
  const [modalVisible, updateModalVisible] = useState(false);
  const [lastLocation, updateLastLocation] = useState();
  const [confirmedNavigation, updateConfirmedNavigation] = useState(false);

  // use the beforeunload event to hook into page refreshes and closes
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      return (event.returnValue = "");
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const showModal = (location) => {
    updateModalVisible(true);
    updateLastLocation(location);
  };

  const closeModal = (cb) => {
    updateModalVisible(false);
    if (cb) {
      cb();
    }
  };

  const handleBlockedNavigation = (nextLocation) => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      showModal(nextLocation);
      return false;
    }
    return true;
  };

  const handleConfirmNavigationClick = () => {
    closeModal(() => {
      if (lastLocation) {
        updateConfirmedNavigation(true);
      }
    });
  };

  useEffect(() => {
    if (confirmedNavigation) {
      navigate(lastLocation.pathname);
      updateConfirmedNavigation(false);
    }
  }, [confirmedNavigation]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <ConfirmBox
        visible={modalVisible}
        onCancel={closeModal}
        onConfirm={handleConfirmNavigationClick}
        children={content}
      ></ConfirmBox>
    </>
  );
};

export default RouteLeavingGuard;
