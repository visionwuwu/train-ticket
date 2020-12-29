import { useCallback } from "react";
import { h0 } from "../../utils/times";
function useNav(departDate, prevDateDispatch, nextDateDispatch) {
  const isPrevDisabled = h0(departDate) <= h0();
  const isNextDisabled = h0(departDate) > h0() + 86400 * 1000 * 20;

  const prevClick = useCallback(() => {
    if (isPrevDisabled) return;
    prevDateDispatch();
  }, [isPrevDisabled, prevDateDispatch]);

  const nextClick = useCallback(() => {
    if (isNextDisabled) return;
    nextDateDispatch();
  }, [isNextDisabled, nextDateDispatch]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prevClick,
    nextClick,
  };
}

export default useNav;
