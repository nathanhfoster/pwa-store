export const cleanPwaPayload = (payload) => {
  let cleanPayload = { ...payload };
  if (cleanPayload.manifest_json) {
    cleanPayload.manifest_json = JSON.parse(payload.manifest_json);
  }

  if (cleanPayload.image_url) {
    cleanPayload.image_url = cleanPayload.image_url.src;
  }

  if (cleanPayload.tags) {
    cleanPayload.tags = cleanPayload.tags.map(({ name }) => name);
  }

  return cleanPayload;
};
