import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import WorkMode from "../common/WorkMode";

/**
 * **ACTION**
 * - changeWorkMode(WorkMode)
 * - showModal(isShow)
 * - setEdit(object)
 * - addModalValue(properties:object)
 * - setCreateMode()
 * - setUpdateMode(object)
 * @returns {[]} [dispatch, navigate, workMode, showModal, objectEdit, modalValue, action]
 */
const useWorkspace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Work mode
  const [workMode, setWorkMode] = useState(WorkMode.view);

  // edit
  const [objectEdit, setObjectEdit] = useState(null);

  // delete
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const action = {
    changeWorkMode: (mode) => setWorkMode(mode),
    showModal: (isShow) => setShowModal(isShow),
    setEdit: (object) => setObjectEdit(object),
    addModalValue: (title, content, cb_delete) => {
      setModalValue({
        title, content,
        handleDelete: cb_delete
      })
    },
    setCreateMode: () => {
      setObjectEdit(null);
      setWorkMode(WorkMode.create);
    },
    setUpdateMode: (object) => {
      setObjectEdit(object);
      setWorkMode(WorkMode.edit);
    }
  }

  return [dispatch, navigate, workMode, showModal, objectEdit, modalValue, action];
}

export default useWorkspace;