import { Option } from './Option.ts';

export default interface Questionnaire {
  title: string;
  question: string;
  options: Option[];
}
