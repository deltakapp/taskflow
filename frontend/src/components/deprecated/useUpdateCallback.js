/* attempt at consolidating useeffect and usecallback for reordering api calls */
/* unfinished */
const { useRef, useEffect } = require("react");

export default function useUpdateEffect(callback) {
  const firstRenderFlag = useRef(true);
  if (firstRenderFlag) {
    firstRenderFlag.current = false;
    return;
  }
  useEffect(() => {
    callback;
  });
}
