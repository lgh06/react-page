import { IconButton, Tooltip } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

import React from 'react';
import {
  useMoveNodeDown,
  useMoveNodeUp,
  useRemoveCell,
  useUiTranslator,
} from '../../core/components/hooks';
import DraftSwitch from '../DraftSwitch';
import { DuplicateButton } from '../DuplicateButton';
import { I18nTools } from '../I18nTools';
import { SelectParentButton } from '../SelectParentButton';
import { BottomToolbarToolsProps } from './types';
export { BottomToolbarToolsProps };
export const BottomToolbarTools: React.FC<BottomToolbarToolsProps> = React.memo(
  ({ nodeId }) => {
    const { t } = useUiTranslator();
    const removeCell = useRemoveCell(nodeId);
    const moveUp = useMoveNodeUp(nodeId);
    const moveDown = useMoveNodeDown(nodeId);
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {moveUp ? <button onClick={moveUp}>move up</button> : null}
        {moveDown ? <button onClick={moveDown}>move down</button> : null}
        <I18nTools nodeId={nodeId} />
        <DraftSwitch nodeId={nodeId} />
        <DuplicateButton nodeId={nodeId} />
        <SelectParentButton nodeId={nodeId} />

        <Tooltip title={t('Remove Plugin')}>
          <IconButton
            onClick={() => removeCell()}
            aria-label="delete"
            color="secondary"
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
);
