interface BaseOption {
  hint: string;
  url: string;
}

interface DetailOption extends BaseOption {
  type: 'detail';
  title: string;
  subtitle: string;
  desc: string;
}

interface SimpleOption extends BaseOption {
  type: 'simple';
  title: string;
  maxLines?: number;
}

export type Option = DetailOption | SimpleOption;
