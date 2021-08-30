import React from 'react';
import { connect } from 'resurrection';
import SelectField from './SelectField';
import TextField from './TextField';

const PwaForm = ({ form, shouldRenderAllFields, lightHouseIsLoading }) => {
  return (shouldRenderAllFields ? Object.keys(form) : ['url']).map((fieldKey) => {
    const { type } = form[fieldKey];

    switch (type) {
      case 'select':
        return <SelectField key={fieldKey} name={fieldKey} lightHouseIsLoading={lightHouseIsLoading} />;
      default:
        return <TextField key={fieldKey} name={fieldKey} lightHouseIsLoading={lightHouseIsLoading} />;
    }
  });
};

const mapStateToProps = ({
  User: {
    pwaToUpload: { form }
  }
}) => ({
  form
});

const options = {
  areMergedPropsEqual: (prevProps, nextProps) => {
    const {
      form: prevForm,
      shouldRenderAllFields: prevShouldRenderAllFields,
      lightHouseIsLoading: prevLightHouseIsLoading
    } = prevProps;
    const {
      form: nextForm,
      shouldRenderAllFields: nextShouldRenderAllFields,
      lightHouseIsLoading: nextLightHouseIsLoading
    } = nextProps;

    if (Object.keys(prevForm).length !== Object.keys(nextForm).length) {
      return false;
    }

    if (prevShouldRenderAllFields !== nextShouldRenderAllFields) {
      return false;
    }

    if (prevLightHouseIsLoading !== nextLightHouseIsLoading) {
      return false;
    }

    return true;
  }
};

export default connect(mapStateToProps, undefined, undefined, options)(PwaForm);
