export const useNextShow = () => {
  const immediatelyShow = ref(false);
  const nextShow = ref(false);
  const handleUseNextShowClick = () => {
    immediatelyShow.value = true;
    nextTick(() => {
      nextShow.value = true;
    });
  };

  return {
    handleUseNextShowClick,
    immediatelyShow,
    nextShow,
  };
};
