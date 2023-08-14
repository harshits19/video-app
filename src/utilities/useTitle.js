import { useEffect } from "react";
const useTitle = (title = "WatchIt", tagLine = "") => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title + tagLine;
    return () => {
      document.title = prevTitle;
    };
  });
};
export default useTitle;
