import React from 'react';
import { PopupBg, PopupDiv, SpaceBetween } from './styledComponents';

export default function Popup({open, onSave, onCancel}) {
    if(!open)return ""
  return <div>
      <PopupBg />
      <PopupDiv>
      Do you want to save this attempt?
      <br />
      <br />
          <SpaceBetween>
          <button onClick={onSave}>Yes</button>
          <button onClick={onCancel}>No</button>
          </SpaceBetween>
      </PopupDiv>
  </div>;
}
