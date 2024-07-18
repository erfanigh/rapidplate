export const emailRegex      = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const slugRegex       = /^[^\s]+$/;
export const NaNCharRegex    = /[^0-9.]+/g;
export const passwordRegex   = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
export const urlRegex        = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$|^$/;
export const winFileNameRule = /^[^<>:"\/\\|?*]+$/;
export const youtubeEmbedUrlRegex = /https:\/\/youtu\.be\//;
export const commaSeparatedRegex  = /^([^,\s]+(,[^,\s]+)*)?$/;