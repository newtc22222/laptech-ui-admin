import { useState } from 'react';
import { useDispatch } from 'react-redux';

const WorkMode = {
  view: 'VIEW',
  create: 'CREATE',
  edit: 'EDIT'
};

/**
 * **ACTION**
 * - changeWorkMode(WorkMode)
 * - showModal(isShow)
 * - setEdit(object)
 * - addModalValue(properties:object)
 * - setCreateMode()
 * - setUpdateMode(object)
 * @returns {{
 *  dispatch: useDispatch,
 *  workMode: string,
 *  showModal: boolean,
 *  objectEdit: object | null,
 *  modalValue: object | null,
 *  action: {
 *    changeWorkMode: (mode: string) => {},
 *    showModal: (show: boolean) => {},
 *    setEdit: (object: object) => {},
 *    addModalValue: (title: string, content: string, cb_delete: () => {}) => {},
 *    setCreateMode: () => {},
 *    setUpdateMode: (object: object) => {}
 *  }
 * }}
 */
const useWorkspace = () => {
  const dispatch = useDispatch();

  // Work mode
  const [workMode, setWorkMode] = useState(WorkMode.view);

  // edit
  const [objectEdit, setObjectEdit] = useState(null);

  // delete
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const action = {
    changeWorkMode: mode => setWorkMode(mode),
    showModal: isShow => setShowModal(isShow),
    setEdit: object => setObjectEdit(object),
    addModalValue: (title, content, cb_delete) => {
      setModalValue({
        title,
        content,
        handleDelete: cb_delete
      });
    },
    setCreateMode: () => {
      setObjectEdit(null);
      setWorkMode(WorkMode.create);
    },
    setUpdateMode: (object, specialWorkMode) => {
      setObjectEdit(object);
      setWorkMode(specialWorkMode || WorkMode.edit);
    }
  };

  return {
    dispatch,
    workMode,
    showModal,
    objectEdit,
    modalValue,
    action
  };
};

export { WorkMode };
export default useWorkspace;
