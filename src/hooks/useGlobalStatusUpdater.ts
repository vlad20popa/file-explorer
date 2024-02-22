import { Dispatch, SetStateAction, useEffect } from "react";

export default function useGlobalStatusUpdater(
  selected: Map<string, boolean>,
  setIndeterminateStatus: (status: boolean) => void,
  setGlobalStatus: Dispatch<SetStateAction<boolean>>,
) {
  const checkAllStatusesSame = () => {
    const selectedArray = Array.from(selected.values());
    const firstStatus = selectedArray[0];
    return selectedArray.every((value) => firstStatus === value);
  };

  useEffect(() => {
    const firstStatus = selected.entries().next().value[1];
    const areStatusesSimilar = checkAllStatusesSame();

    if (areStatusesSimilar) {
      setIndeterminateStatus(false);
      setGlobalStatus(firstStatus);
    } else {
      setGlobalStatus(false);
      setIndeterminateStatus(true);
    }
  }, [selected]);

  return checkAllStatusesSame;
}
