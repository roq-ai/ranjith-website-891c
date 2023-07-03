import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  description: yup.string().required(),
  customer_id: yup.string().nullable(),
  investigation_id: yup.string().nullable(),
});
