// ID and Date are missing when the form is submitted, but luckily they aren't checked then
// Date is added when the form is uploaded to firebase
// ID is added when form is retrieved from firebase
// Kind of hacky, but for the sake of time I'm not going to worry about it

declare type QuestionAnswer = 0 | 1 | 2 | 3 | 4;

declare type TFormData = {
  id: string;
  first_name: string;
  last_name: string;
  patient_id: string;
  date: string;
  question_0: QuestionAnswer;
  question_1: QuestionAnswer;
  question_2: QuestionAnswer;
  question_3: QuestionAnswer;
  question_4: QuestionAnswer;
  question_5: QuestionAnswer;
  question_6: QuestionAnswer;
  question_7: QuestionAnswer;
  question_8: QuestionAnswer;
  question_9: QuestionAnswer;
  question_10: QuestionAnswer;
  question_11: QuestionAnswer;
  question_12: QuestionAnswer;
  question_13: QuestionAnswer;
  question_14: QuestionAnswer;
  question_15: QuestionAnswer;
  question_16: QuestionAnswer;
  question_17: QuestionAnswer;
  question_18: QuestionAnswer;
  question_19: QuestionAnswer;
};
