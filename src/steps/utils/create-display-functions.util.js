export const createDisplayFunctions = ({ totalSteps }) => {
  let stepNumberCount = 0;

  const start = performance.now();
  let lastStep = performance.now();

  const formatTime = ms => (ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms.toFixed(2)}ms`);

  const display = (content, indent = 0) => {
    const indentation = '  '.repeat(indent);
    const indentedContent = String(content).replaceAll(/^/gm, indentation);
    const output = `${indent ? '' : '\n'}${indentedContent}`;
    console.log(output);
  };
  const displayInfo = content => display(`- ${content}`, 1);
  const displayProgress = (
    content,
    indent = 0,
    { stepNumber = stepNumberCount++, numberOfSteps = totalSteps } = {}
  ) => {
    lastStep = performance.now();
    display(`[${stepNumber + 1}/${numberOfSteps}] ${content}`, indent);
  };
  const displayDone = (indent = 1) => display(`Done in ${formatTime(performance.now() - lastStep)}`, indent);
  const displayFinish = () => display(`Script completed in ${formatTime(performance.now() - start)}\n`);

  return { display, displayInfo, displayProgress, displayDone, displayFinish };
};
