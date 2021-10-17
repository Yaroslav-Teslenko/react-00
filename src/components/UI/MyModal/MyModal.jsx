import React from "react";
import cl from "./MyModal.module.css";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.myModal];
  //console.log(cl);
  if (visible) {
    rootClasses.push(cl.active);
  }
  /* onClick={() => setVisible(false)} - закрыть при нажатии на серое */
  /* onClick={(e) => e.stopPropagation() - отменить закрытие при нажатии на белое */
  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
