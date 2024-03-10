import { openBrowserAsync } from "expo-web-browser";

const useBrowser = () => {
  const open = async (url: string) => {
    await openBrowserAsync(url);
  };

  return open;
};

export default useBrowser;
