import { debounce } from 'lodash';
import { calcEntropyInView } from "../util/tree/traversals";
import * as types from "./types";

export const updateEntropyVisibility = debounce((dispatch, getState) => {
  const { entropy, controls, tree } = getState();
  if (!tree.nodes || !tree.visibility || !entropy.geneMap) {return;}
  const [data, maxYVal] = calcEntropyInView(tree.nodes, tree.visibility, controls.mutType, entropy.geneMap);
  dispatch({type: types.ENTROPY_DATA, data, maxYVal});
}, 1000, { leading: true, trailing: true });

export const changeMutType = (newMutType) => (dispatch, getState) => {
  dispatch({type: types.TOGGLE_MUT_TYPE, data: newMutType});
  updateEntropyVisibility(dispatch, getState);
};
