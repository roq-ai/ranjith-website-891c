import * as yup from 'yup';

export const investigationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  company_id: yup.string().nullable(),
  customer_id: yup.string().nullable(),
});
