// ID and Date are missing when the form is submitted, but luckily they aren't checked then
// Date is added when the form is uploaded to firebase
// ID is added when form is retrieved from firebase
// Kind of hacky, but for the sake of time I'm not going to worry about it

declare type TFormData = {
  id: string;
  first_name: string;
  last_name: string;
  patient_id: string;
  date: string;
  question_0: 0 | 1 | 2 | 3 | 4;
  question_1: 0 | 1 | 2 | 3 | 4;
  question_2: 0 | 1 | 2 | 3 | 4;
  question_3: 0 | 1 | 2 | 3 | 4;
  question_4: 0 | 1 | 2 | 3 | 4;
  question_5: 0 | 1 | 2 | 3 | 4;
  question_6: 0 | 1 | 2 | 3 | 4;
  question_7: 0 | 1 | 2 | 3 | 4;
  question_8: 0 | 1 | 2 | 3 | 4;
  question_9: 0 | 1 | 2 | 3 | 4;
  question_10: 0 | 1 | 2 | 3 | 4;
  question_11: 0 | 1 | 2 | 3 | 4;
  question_12: 0 | 1 | 2 | 3 | 4;
  question_13: 0 | 1 | 2 | 3 | 4;
  question_14: 0 | 1 | 2 | 3 | 4;
  question_15: 0 | 1 | 2 | 3 | 4;
  question_16: 0 | 1 | 2 | 3 | 4;
  question_17: 0 | 1 | 2 | 3 | 4;
  question_18: 0 | 1 | 2 | 3 | 4;
  question_19: 0 | 1 | 2 | 3 | 4;
};
