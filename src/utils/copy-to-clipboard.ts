const CopyToClipboard = (text: string = "") => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
};

export default CopyToClipboard;
