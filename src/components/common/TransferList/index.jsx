import React, { useEffect, useState } from 'react';

import { icon_transform } from '../../../assets/svg';

import BoxChoice from './BoxChoice';

const TranfersList = ({ options, choiceList = [], setChoiceList, ...rest }) => {
  const [optionList, setOptionList] = useState(
    options.filter(item => !choiceList.find(choice => choice.id === item.id))
  );

  useEffect(
    () =>
      setOptionList(
        options.filter(
          item => !choiceList.find(choice => choice.id === item.id)
        )
      ),
    [choiceList]
  );

  const [optionSelect, setOptionSelect] = useState([]);
  const [choiceSelect, setChoiceSelect] = useState([]);

  const handleSetOptionList = choices => {
    setOptionList([...optionList, ...choices]);
    setChoiceList(
      choiceList.filter(item => !choices.find(choice => choice.id === item.id))
    );
    setChoiceSelect([]);
  };

  const handleSetChoiceList = choices => {
    setOptionList(
      optionList.filter(item => !choices.find(choice => choice.id === item.id))
    );
    setChoiceList([...choiceList, ...choices]);
    setOptionSelect([]);
  };

  return (
    <div className="container my-2">
      <div className="row">
        <BoxChoice
          options={optionList}
          selected={optionSelect}
          setSelected={setOptionSelect}
        />
        <div className="col col-2 d-flex flex-column gap-2 justify-content-center">
          <button
            type="button"
            className="w-100 btn btn-outline-dark"
            onClick={() => handleSetChoiceList(optionList)}
            disabled={optionList.length === 0}
          >
            {icon_transform.last}
          </button>
          <button
            type="button"
            className="w-100 btn btn-outline-dark"
            onClick={() => handleSetChoiceList(optionSelect)}
            disabled={optionList.length === 0 || optionSelect.length === 0}
          >
            {icon_transform.next}
          </button>
          <button
            type="button"
            className="w-100 btn btn-outline-dark"
            onClick={() => handleSetOptionList(choiceSelect)}
            disabled={choiceList.length === 0 || choiceSelect.length === 0}
          >
            {icon_transform.previous}
          </button>
          <button
            type="button"
            className="w-100 btn btn-outline-dark"
            onClick={() => handleSetOptionList(choiceList)}
            disabled={choiceList.length === 0}
          >
            {icon_transform.first}
          </button>
        </div>
        <BoxChoice
          options={choiceList}
          selected={choiceSelect}
          setSelected={setChoiceSelect}
        />
      </div>
    </div>
  );
};

export default TranfersList;
