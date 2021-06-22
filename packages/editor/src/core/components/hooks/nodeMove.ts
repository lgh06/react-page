import { useCallback, useMemo } from 'react';
import { isRow } from '../../../core/types';
import { useDropActions } from './dragDropActions';
import { useNodeAsHoverTarget, useNodeProps } from './node';
import { findSiblingRow } from './utils/findSiblingRow';

export const useMoveNodeUp = (nodeId: string) => {
  const actions = useDropActions(nodeId);
  const { cell, previousRowId, isSameLevel } = useNodeProps(
    nodeId,
    (node, ancestors) => {
      const previousRow = findSiblingRow(nodeId, ancestors, 'previous');
      const isSameLevel =
        ancestors[1] && !isRow(ancestors[1])
          ? ancestors[1].rows?.some((r) => r.id === previousRow?.id)
          : false;

      return {
        cell: node,
        previousRowId: previousRow?.id,
        isSameLevel,
      };
    }
  );

  const hoverTarget = useNodeAsHoverTarget(previousRowId);

  return useMemo(() => {
    if (!hoverTarget) {
      return null;
    }
    return () => {
      if (isSameLevel) {
        // skip 1
        actions.above(cell, hoverTarget, 0);
      } else {
        actions.below(cell, hoverTarget, 0);
      }
    };
  }, [actions, hoverTarget, cell, isSameLevel]);
};

export const useMoveNodeDown = (nodeId: string) => {
  const actions = useDropActions(nodeId);
  const { cell, nextRowId, isSameLevel } = useNodeProps(
    nodeId,
    (node, ancestors) => {
      const nextRow = findSiblingRow(nodeId, ancestors, 'next');
      const isSameLevel =
        ancestors[1] && !isRow(ancestors[1])
          ? ancestors[1].rows?.some((r) => r.id === nextRow?.id)
          : false;

      return {
        cell: node,
        nextRowId: nextRow?.id,
        isSameLevel,
      };
    }
  );

  const hoverTarget = useNodeAsHoverTarget(nextRowId);

  return useMemo(() => {
    if (!hoverTarget) {
      return null;
    }
    return () => {
      console.log({ isSameLevel, hoverTarget });
      if (isSameLevel) {
        // skip 1
        actions.below(cell, hoverTarget, 0);
      } else {
        actions.above(cell, hoverTarget, 0);
      }
    };
  }, [actions, hoverTarget, cell, isSameLevel]);
};
