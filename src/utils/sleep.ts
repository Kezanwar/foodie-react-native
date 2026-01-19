function sleep(seconds: number = 5) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, seconds * 1000);
  });
}

export default sleep;
