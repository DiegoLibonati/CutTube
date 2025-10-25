export type ClipVideoResponse = {
  code: string;
  message: string;
  data: {
    name: string;
    filename: string;
  };
};

export type RemoveClipResponse = {
  code: string;
  message: string;
};
