import React, { useEffect } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { resetAll} from "../redux/TextSlice/TextSlice";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: 25,
    fontWeight: 700,
    backgroundColor: "#F9F7CF",
  },
};
Modal.setAppElement("#root");

const ModalComponent = ({ restart, setInput }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const trueWord = useSelector((state) => state.text.trueWord);
  const falseWord = useSelector((state) => state.text.falseWord);
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    openModal();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  const handleReset = () => {
    dispatch(resetAll());
    closeModal();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 59);
    restart(time);
    setInput("");
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          60 saniyede doğru yazılabilen kelime sayısı: {trueWord.length}
        </div>
        <div>Hatalı Kelime Sayısı: {falseWord.length}</div>
        <VscDebugRestart
          onClick={handleReset}
          style={{ fontSize: 45, cursor: "pointer" }}
        />
      </Modal>
    </div>
  );
};

export default ModalComponent;
