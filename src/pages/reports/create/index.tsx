import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createReport } from 'apiSdk/reports';
import { Error } from 'components/error';
import { reportValidationSchema } from 'validationSchema/reports';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { InvestigationInterface } from 'interfaces/investigation';
import { getUsers } from 'apiSdk/users';
import { getInvestigations } from 'apiSdk/investigations';
import { ReportInterface } from 'interfaces/report';

function ReportCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReportInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReport(values);
      resetForm();
      router.push('/reports');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReportInterface>({
    initialValues: {
      description: '',
      customer_id: (router.query.customer_id as string) ?? null,
      investigation_id: (router.query.investigation_id as string) ?? null,
    },
    validationSchema: reportValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Report
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<InvestigationInterface>
            formik={formik}
            name={'investigation_id'}
            label={'Select Investigation'}
            placeholder={'Select Investigation'}
            fetcher={getInvestigations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.status}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'report',
    operation: AccessOperationEnum.CREATE,
  }),
)(ReportCreatePage);
